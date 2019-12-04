const assert = require('assert');
const updateDocument = function(db, oldPais, newPais, callback) {
    // Get the documents collection
    const collection = db.collection('geografica');
    // Update documents
    collection.updateMany({ pais : oldPais }
      , { $set: { pais: newPais } }, function(err, result) {
      assert.equal(err, null);
      callback(null, result);
    });  
  }
 module.exports=updateDocument