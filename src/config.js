const admin = require('firebase-admin');

const serviceAccount = require('./urlshortener-80495-firebase-adminsdk-ako6j-619b4070f7.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const url = db.collection('urls');
module.exports = url;