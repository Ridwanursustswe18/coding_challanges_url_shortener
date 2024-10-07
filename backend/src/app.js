const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); 
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());
app.use(express.json());
const urlShortenerRoute = require('./routes/urlShortenerRoute');

app.use('/', urlShortenerRoute);
app.use('/', (req, res) => {
  res.status(200).json("server running");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});