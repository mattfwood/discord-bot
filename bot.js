require('dotenv').config();

const Raven = require('raven');

Raven.config(process.env.SENTRY_DSN).install();

const auth = require('./auth.json');

const Discord = require('discord.js');

const client = new Discord.Client();
const images = require('./images');
const deepFriedMemes = require('./deepFriedMemes');
const axios = require('axios');
const champIds = require('./champIds');
const getRandomTweet = require('./twitter');

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const imageCount = images.length;
const memesCount = deepFriedMemes.length;

client.on('message', (msg) => {
  const imageIndex = Math.floor(Math.random() * Math.floor(imageCount));
  if (msg.content == '!antique') {
    msg.reply(images[imageIndex]);
  }

  if (msg.content.includes('thank you')) {
    msg.reply('i love you');
  }

  if (msg.content == 'good bot') {
    msg.reply('hey thanks man');
  }

  if (msg.content == 'bad bot') {
    msg.reply('wow ok');
  }

  if (msg.content.includes('!games')) {
    msg.reply('https://pbs.twimg.com/profile_images/926473710751617025/6j-smg8d_400x400.jpg');
  }

  if (msg.content === 'i hate you') {
    msg.reply('i hate you too 🤖');
  }

  if (msg.content.includes('!joke') && msg.content.includes('week')) {
    msg.reply('https://gfycat.com/WavyExaltedAquaticleech');
  }

  if (msg.content.includes('can i get uh')) {
    const number = Math.floor(Math.random() * 1000);
    msg.reply(`https://picsum.photos/500/200/?image=${number}`);
  }

  if (msg.content.includes('!commands')) {
    msg.reply("you can't command me");
  }

  if (msg.content === '!meme') {
    axios
      .get('https://www.reddit.com/r/DeepFriedMemes/hot.json?limit=100')
      .then((response) => {
        const postCount = response.data.data.children.length;
        const memeIndex = Math.floor(Math.random() * Math.floor(postCount));
        msg.reply(response.data.data.children[memeIndex].data.url);
        // response.data.children[memesCount];
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (msg.content.includes('!twitter')) {
    const twitterHandle = msg.content.split('!twitter ')[1];
    getRandomTweet(twitterHandle).then((tweet) => {
      msg.reply(tweet);
    });
  }

  if (msg.content.includes('!gg')) {
    // get champion name from command
    const championName = msg.content.split('!gg ')[1];

    // get champion ID from champId index
    const championId = champIds[championName.toLowerCase()];

    // get data from Champion.gg API
    axios
      .get(`http://api.champion.gg/v2/champions/${championId}/matchups?api_key=${
        process.env.CHAMPION_GG_TOKEN
      }&limit=200`)
      .then((response) => {
        const { data } = response;

        // only get matchups with over 500 occurrences
        const validMatchups = data.filter(matchup => matchup.count > 500);

        if (validMatchups.length > 0) {
          const championAndWinrate = validMatchups.map((matchup) => {
            let opponentName = '';
            // if champion 2 isn't the searched champion
            if (matchup._id.champ2_id.toString() !== championId) {
              // opponent is champ 2
              opponentName = getKeyByValue(champIds, matchup._id.champ2_id.toString());
            } else {
              // otherwise they're champ 1
              opponentName = getKeyByValue(champIds, matchup._id.champ1_id.toString());
            }

            // TODO: Add champion icons?
            // http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png

            return { name: opponentName, winrate: matchup.champ2.winrate, count: matchup.count };
          });

          console.log(championAndWinrate);

          String.prototype.capitalize = function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
          };

          // sort winrates from lowest to highest
          const sortedWinrates = championAndWinrate.sort((a, b) => a.winrate - b.winrate);

          // map winrates to field objects, limit to top 6 matchups
          const fields = sortedWinrates
            .map(matchup => ({
              name: matchup.name.capitalize(),
              value: `Winrate: ${(matchup.winrate * 100).toFixed(2)}% (${
                matchup.count
              } games played)`,
            }))
            .slice(0, 5);

          // object for discord embedded message
          const embed = {
            title: 'Champion Counters',
            color: 551208,
            thumbnail: {
              url: 'https://cdn.discordapp.com/embed/avatars/0.png',
            },
            author: {
              name: 'Champion GG Bot',
              url: 'https://discordapp.com',
              icon_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
            },
            fields,
          };

          // send message
          msg.channel.send(`Champion Matchups for ${championName}`, { embed });
        } else {
          // if no valid matchups, return nothing
          msg.channel.send(`${championName} isn't a champion you dingus`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

client.login(process.env.DISCORD_API_TOKEN);
