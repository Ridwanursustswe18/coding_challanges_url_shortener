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
    const shortUrl = 'http://localhost/';
  checkIfKeyExistsInHashSet('urls', 'key', key)
      .then(async keyExists => {
          if (keyExists) {
              const uniqueValue = Math.random().toString(6);
              key = hashKey(longUrl + uniqueValue, 6);
          }
  
          await urls.add({
              key: key,
              longUrl: longUrl,
              shortUrl: shortUrl + key
          });
  
          res.status(201).json({
              key: key,
              long_url: longUrl,
              short_url: shortUrl + key
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
const redirectToURL = async(req,res)=>{
  try {
    const key = req.params.url;
    const urlExists = await urls.where('key','==', key).get();
    if (urlExists.size == 0) {
      return res.status(404).send('URL not found');
    }

    let longUrl = null;
    urlExists.forEach((doc) => {
      longUrl = doc.data().longUrl;
    });
    return res.status(302).set('location', longUrl).send();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error');
  }

}
const deleteUrl = async(req,res)=>{
  try{
    const key = req.params.url;
    const querySnapshot = await urls.where('key', '==', key).get();
    if (querySnapshot.empty) {
      res.status(404).send('URL not found');
      return; 
    }
    const doc = querySnapshot.docs[0];
    await doc.ref.delete();
    return res.status(200).send();

  }catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error');
  }
}

module.exports = {shortenURL,redirectToURL,deleteUrl};    