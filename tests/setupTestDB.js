// tests/setupTestDB.js
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongodb = require('../data/database');

let mongod;

module.exports = {
  async start() {
    mongod = await MongoMemoryServer.create();
    process.env.MONGODB_URL = mongod.getUri();
    await new Promise((resolve, reject) => {
      mongodb.initDb((err) => err ? reject(err) : resolve());
    });
  },
  async stop() {
    if (mongod) await mongod.stop();
  }
};
