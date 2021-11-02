const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const MongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://mouraa_:UiMvSHh6j82NIwLY@projectmoura.oe7lc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        .then(client => {
            console.log('connected!');
            _db = client.db();
            callback(client);
        })
        .catch(err => console.log(err));
};

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No database found!'
};

exports.MongoConnect = MongoConnect;
exports.getDb = getDb;