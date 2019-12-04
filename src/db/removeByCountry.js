const assert = require('assert');
const removeDocuments = (db, country, callback) => {
    const collection = db.collection('geografica');
    // Delete many documents
    collection.deleteMany({pais : country}, (err, docs) =>{
      assert.equal(err, null);
      callback(err, docs);
    });
 }
 module.exports=removeDocuments