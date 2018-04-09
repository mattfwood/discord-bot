const axios = require('axios');
const cheerio = require('cheerio');

const url =
  'https://photos.google.com/share/AF1QipMH4xvcTbM12OjCN12o-U9syQQAXhiYtQO0FKFYTCfKlA37uwvmoIoTmVbO7QqCgA?key=TWZqV1ZqVWYtT2ZwbFh1MFRiMVNTZDZDQnZsdlBR';

function tPose() {
  axios.get(url).then((response) => {
    const $ = cheerio.load(response.data);
    // console.log(response.data);

    const images = [];

    $('div').each((i, elm) => {
      console.log($(this))
      if ($(this).attr('style')) {
        console.log('style tag exists');
        const style = $(this).attr('style');
        if (style.includes('background-image')) {
          console.log('background image exists');
          console.log($(this).attr('style'));
        }
      }
    });
  });
}

tPose();

module.exports = tPose;
