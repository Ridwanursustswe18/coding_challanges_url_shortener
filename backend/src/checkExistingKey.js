const { getFirestore } = require('firebase-admin/firestore'); 

async function insertIntoHashSet(collectionName, columnName) {
    const db = getFirestore(); 
    const snapshot = await db.collection(collectionName).get(); 
    const hashSet = new Set();
    snapshot.forEach(doc => {
        const columnValue = doc.data()[columnName];
        hashSet.add(columnValue);
    });

    return hashSet;
}

async function checkIfKeyExistsInHashSet(collectionName, columnName, key) {
    const hashSet = await insertIntoHashSet(collectionName, columnName);
    return hashSet.has(key);
}
module.exports = checkIfKeyExistsInHashSet;