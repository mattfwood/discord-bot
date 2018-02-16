var auth = require('./auth.json');

const Discord = require('discord.js');
const client = new Discord.Client();
const images = require('./images');
const deepFriedMemes = require('./deepFriedMemes')
const axios = require('axios');

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
		const championId = msg.content.split('gg ')[1];

		axios.get(`http://api.champion.gg/v2/champions/${championId}/matchups?api_key=${championGGKey}`)
			.then(response => {
				console.log(response.data);
				msg.reply(JSON.stringify(response.data[0].champ1));
			})
			.catch(error => {
				console.log(error);
			});

	}
});

client.login(auth.token);

// heroku git:remote -a antique-discord-bot