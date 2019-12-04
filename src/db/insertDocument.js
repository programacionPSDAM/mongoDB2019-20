const assert = require('assert');
const insertDocuments = function(db, document, callback) {
    const collection = db.collection('geografica');
    // Insert some documents
    collection.insertOne(document, (err, result) => {
      assert.equal(err, null);
      callback(null, result);
    });
  }
 module.exports=insertDocuments