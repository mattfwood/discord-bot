const axios = require('axios');

function generateMeme(template, content) {
  return new Promise((resolve, reject) => {
    const topText = 'top text';
    const bottomText = 'bottom text';
    const boxes = content.split(',').map(item => {
      text: item.trim();
    });
    axios
      .post('https://api.imgflip.com/caption_image', {
        data: {
          template_id: '14859329',
          username: 'mw0268',
          password: 'discordbotmeme',
          text0: 'top text',
          text1: 'bottom text',
        },
      })
      .then(response => {
        console.log(response);

        resolve(response);
      })
      .catch(error => {
        console.log(error);

        reject(error);
      });
  });
}

module.exports = generateMeme;
