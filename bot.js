require('dotenv').config()
var rollbar = require("rollbar");
rollbar.init(process.env.ROLLBAR_ACCESS_TOKEN);

var auth = require('./auth.json');

const Discord = require('discord.js');
const client = new Discord.Client();
const images = require('./images');
const deepFriedMemes = require('./deepFriedMemes')
const axios = require('axios');
const champIds = require('./champIds');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const imageCount = images.length;
const memesCount = deepFriedMemes.length;

client.on('message', msg => {
  const imageIndex = Math.floor(Math.random () * Math.floor(imageCount));
  if (msg.content.includes('antique')) {
    msg.reply(images[imageIndex]);
  }

  if (msg.content.includes('thank you')) {
    msg.reply('i love you');
    }

    if (msg.content.includes('good') && msg.content.includes('bot')) {
        msg.reply('hey thanks man');
    }

    if (msg.content.includes('bad') && msg.content.includes('bot')) {
        msg.reply('wow ok');
    }

    if (msg.content.includes('games')) {
        msg.reply('https://pbs.twimg.com/profile_images/926473710751617025/6j-smg8d_400x400.jpg');
    }

    if (msg.content === 'i hate you') {
        msg.reply('i hate you too 🤖');
    }

    if (msg.content.includes('joke') && msg.content.includes('week')) {
        msg.reply('https://gfycat.com/WavyExaltedAquaticleech');
    }

    if (msg.content.includes('can i get uh')) {
        const number = Math.floor(Math.random() * 1000)
        msg.reply(`https://picsum.photos/500/200/?image=${number}`);
    }

    if (msg.content.includes('commands')) {
        msg.reply("you can't command me");
    }

    if (msg.content.includes('meme')) {
        const memeIndex = Math.floor(Math.random () * Math.floor(memesCount));
        msg.reply(deepFriedMemes[memeIndex]);
    }

    const championGGKey = '13bb47f9260bc05def5d8a2fc50585b5';

    if (msg.content.includes('gg')) {
        const championName = msg.content.split('gg ')[1];
        const championId = champIds[championName.toLowerCase()];

        function getKeyByValue(object, value) {
          return Object.keys(object).find(key => object[key] === value);
        }

        axios.get(`http://api.champion.gg/v2/champions/${championId}/matchups?api_key=${championGGKey}&limit=200`)
            .then(response => {
                console.log(response.data);
                const { data } = response;

                // only get matchups with over 500 occurrences
                const validMatchups = data.filter(matchup => matchup.count > 500);

                const championAndWinrate = validMatchups.map(matchup => {
									let opponentName = '';
									// if champion 2 isn't the searched champion
									if (matchup._id.champ2_id.toString() !== championId) {
										// opponent is champ 2
										opponentName = getKeyByValue(champIds, matchup._id.champ2_id.toString());
									} else {
										// otherwise they're champ 1
										opponentName = getKeyByValue(champIds, matchup._id.champ1_id.toString());
									}

									// http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png 
									
                  return { name: opponentName, winrate: matchup.champ2.winrate, count: matchup.count }
								});

								console.log(championAndWinrate);

								String.prototype.capitalize = function() {
									return this.charAt(0).toUpperCase() + this.slice(1);
								}

								// get sorted winrates, limit to 10
								const sortedWinrates = championAndWinrate.sort(function(a, b) {
									return a.winrate - b.winrate;
								});

								const fields = sortedWinrates.map(matchup => {
									return { name: matchup.name.capitalize(), value: `Winrate: ${(matchup.winrate * 100).toFixed(2)}% (${matchup.count} games played)`}
								}).slice(0, 5);
								
								const embed = {
									"title": "Champion Counters",
									"color": 551208,
									"thumbnail": {
										"url": "https://cdn.discordapp.com/embed/avatars/0.png"
									},
									"author": {
										"name": "Champion GG Bot",
										"url": "https://discordapp.com",
										"icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
									},
									"fields": fields
								};
								msg.channel.send(`Champion Matchups for ${championName}`, { embed });
            })
            .catch(error => {
                console.log(error);
            });

    }
});

client.login(auth.token);

// heroku git:remote -a antique-discord-bot