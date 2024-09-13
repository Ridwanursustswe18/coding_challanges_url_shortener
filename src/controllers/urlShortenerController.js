const urls = require('../config');
const hashKey = require('../hashKey');
const checkIfKeyExistsInHashSet = require('../checkExistingKey');
const shortenURL = async (req, res) => {
    try{
    const longUrl = req.body.url;
    if (!req.body || !req.body.hasOwnProperty('url') || longUrl === "") {
      res.status(400).send('Missing field: url');
      return;
    }
    const urlExists = await urls.where('longUrl','==', longUrl).get();
    if(urlExists.size > 0){
      let shortUrl = null;
      urlExists.forEach((doc) => {
        shortUrl = doc.data().shortUrl;
      });
      res.status(201).json({
        short_url:shortUrl,
      })
      return;
    }
    let key = hashKey(longUrl,5);
  checkIfKeyExistsInHashSet('urls', 'key', key)
      .then(async keyExists => {
          if (keyExists) {
              const uniqueValue = Math.random().toString(6);
              key = hashKey(longUrl + uniqueValue, 6);
          }
  
          await urls.add({
              key: key,
              longUrl: longUrl,
              shortUrl: `http://localhost/${key}`
          });
  
          res.status(201).json({
              key: key,
              long_url: longUrl,
              short_url: `http://localhost/${key}`
          });
      })
      .catch(error => {
          console.error('Error:', error);
      });
    }catch (error){
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
module.exports = shortenURL;    