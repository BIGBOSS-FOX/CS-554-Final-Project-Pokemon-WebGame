const { MongoClient } = require('mongodb');
const settings = require('./settings');

const { mongoConfig } = settings;

let connection;
let db;

module.exports = async () => {
  if (!connection) {
    connection = await MongoClient.connect(mongoConfig.serverURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db(mongoConfig.database);
  }
  return db;
};
