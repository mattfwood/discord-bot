const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://imgur.com/gallery/Dcb4n';

axios.get(url).then(response => {
    // console.log(response.data);

    const $ = cheerio.load(response.data);

    const links = [];

    $('.post-image img').each(function(i, elm) {
        links.push($(this).attr('src'));
    });

    console.log(links);
});

