const fs = require('fs');
const data = require('./deepFriedData');

let images = [];

console.log(data);

data.data.forEach(item => {
    images.push(item.link);
})


fs.writeFileSync('./deepFriedMemes.js', `module.exports = ${JSON.stringify(images)}`, 'utf8');