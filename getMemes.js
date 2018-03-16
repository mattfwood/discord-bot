const axios = require('axios');

axios.get('https://api.imgflip.com/get_memes')
  .then(response => {
    console.log(JSON.stringify(response.data));
  })
  .catch(error => {
    console.log(error);
  });