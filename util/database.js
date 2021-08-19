const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (() => {
  MongoClient.connect(
    'mongodb+srv://joel:jvSpRQTX3b4wvdS@cluster0.i2vpz.mongodb.net/shop?retryWrites=true&w=majority'
  )
    .then(client => {
        console.log('Connected!');
        _db = client.db();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
})();

const getDb = () => {
    if(_db) {
        return _db
    }
    throw 'No database Found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
