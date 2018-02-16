var auth = require('./auth.json');

const Discord = require('discord.js');
const client = new Discord.Client();
const images = require('./images');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const imageCount = images.length;

client.on('message', msg => {
    const imageIndex = Math.floor(Math.random () * Math.floor(imageCount));
  if (msg.content.includes('antique')) {
    msg.reply(images[imageIndex]);
  }

  if (msg.content.includes('thank you')) {
    msg.reply('i love you');
	}
	
	if (msg.content.includes('!joke')) {
		msg.reply('i love me a big ol racism');
	}

	if (msg.content.includes('good') && msg.content.includes('bot')) {
		msg.reply('hey thanks man');
	}

	if (msg.content.includes('bad') && msg.content.includes('bot')) {
		msg.reply('eat me ass');
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
});

client.login(auth.token);

