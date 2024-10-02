const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const serverless = require('serverless-http');
app.use(cors());
app.use(express.json());
const urlShortenerRoute = require('../../backend/src/routes/urlShortenerRoute');
app.use('/', urlShortenerRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
module.exports.handler = serverless(app);