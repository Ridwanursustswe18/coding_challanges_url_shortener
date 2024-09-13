const crypto = require('crypto');

function generateFixedSizeKey(input) {
    return crypto.createHash('sha256').update(input).digest('base64');
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomSlicedKey(input, length) {
    const fullKey = generateFixedSizeKey(input);
    const startPos = getRandomInt(0, fullKey.length - length);
    return fullKey.slice(startPos, startPos + length);
}

module.exports = generateRandomSlicedKey;