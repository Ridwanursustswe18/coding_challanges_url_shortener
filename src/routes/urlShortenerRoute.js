const express = require('express');
const app = express();
const router = express.Router();
const urlShortenerController = require('../controllers/urlShortenerController');
router.post('/add-url',urlShortenerController.shortenURL);
router.get('/:url',urlShortenerController.redirectToURL);
module.exports = router;