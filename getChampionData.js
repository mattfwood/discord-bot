const fs = require('fs');
const axios = require('axios');

async function getChampionData() {
  try {
    const response = await axios.get('http://ddragon.leagueoflegends.com/cdn/8.5.1/data/en_US/champion.json');
    console.log(response.data);

    fs.writeFileSync('./championData.json', JSON.stringify(response.data), 'utf8');
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

getChampionData();

module.exports = getChampionData;
