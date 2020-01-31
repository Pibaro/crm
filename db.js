const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const dbname = 'crm';
const url = "mongodb://localhost:27017";
const mongoOptions = {useNewUrlParser: true};

let db = MongoClient('crm');
let error;
let waiting = [];
// collection.insertOne(
//   {
//     firstname: "Roger",
//     lastname: "Baseme",
//     email: "baraka@pilipili.io",
//     phone: "2330506378473",
//     organization: "MEST Africa",
//     address: "20 Goma, DR Congo",
//     interest: 7,
//     purchases: 19,
//     notes: "very interested"
// });

const state = {
  db: null
};

MongoClient.connect(URL,function(err,database){
  error = err;
  db = database;

  waiting.forEach(function(callback) {
    callback(err, database);
  });
});

module.exports = function(callback) {
  if (db || error) {
    callback(error, db);
  } else {
    waiting.push(callback);
  }
}

const getPrimaryKey = (_id) => {
  return ObjectID (_id)
}

const getDB = () => {
  return state.db;
}

// Connect Option 2
const connect = (cb) => {
  if (state.cb)
        (cb);
  else {
    MongoClient.connect (url, mongoOptions, (err,client) => {
      if (err)
        cb(err);
      else {
        state.db = client.db(dbname);
        cb();
      }
    });
  }
}

module.exports = {getDB, connect, getPrimaryKey};
