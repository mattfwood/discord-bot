require('dotenv').config()
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

const getRandomTweet = (handle) => {
  return new Promise((resolve, reject) => {
    const params = { screen_name: handle };
  
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        const randomTweetId = tweets[Math.floor(Math.random() * Math.floor(tweets.length))].id_str;
        randomTweetId;
        resolve(`https://twitter.com/statuses/${randomTweetId}`);
      }
      reject(error);
    });
  })
}

module.exports = getRandomTweet;
