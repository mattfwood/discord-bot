const fs = require('fs');
const data = require('./data');

let images = [];

console.log(data);

data.data.forEach(item => {
    images.push(item.link);
})


fs.writeFileSync('./images.js', `module.exports = ${JSON.stringify(images)}`, 'utf8');