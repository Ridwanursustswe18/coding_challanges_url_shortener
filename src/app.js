const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const urlShortenerRoute = require('./routes/urlShortenerRoute');
app.use('/', urlShortenerRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});