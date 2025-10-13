// tests/setupTestDB.js
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;

module.exports = {
  async start() {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    process.env.MONGODB_URL = uri; // used by your data/database.js when initDb is called
    return uri;
  },
  async stop() {
    if (mongod) await mongod.stop();
  }
};
