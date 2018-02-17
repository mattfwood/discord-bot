const fs = require('fs');
const championData = require('./championData.json').data;
// const champIds = require('./champIds');

// const champIds = [];

// console.log(Array.isArray(Object.keys(championData.data)));

let champIds = {};

Object.keys(championData).forEach(key => {
    champIds[key.toLowerCase()] = championData[key].key;
});

fs.writeFileSync('./champIds.js', `module.exports = ${JSON.stringify(champIds)}`, 'utf8');

console.log(champIds);