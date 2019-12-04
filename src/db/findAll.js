const assert = require('assert');
const findDocuments = (db, callback) => {
    // Get the documents collection
    const collection = db.collection('geografica');
    // Find all documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      callback(err, docs);
    });
 }
 module.exports=findDocuments
