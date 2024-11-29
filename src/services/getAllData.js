const {Firestore} = require('@google-cloud/firestore');

async function getAllData(){
    const db = new Firestore();
    const predicCollection = db.collection('predictions');

    const allData= await predicCollection.get();
    return allData;
}

module.exports = getAllData;