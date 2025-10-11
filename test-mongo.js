// test-mongo.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

(async () => {
  const uri = process.env.MONGODB_URL;
  if (!uri) return console.error('MONGODB_URL not set in .env');

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(); // default DB from URI
    console.log('Connected! DB name:', db.databaseName);
    const cols = await db.listCollections().toArray();
    console.log('Collections:', cols.map(c => c.name));
    await client.close();
    process.exit(0);
  } catch (err) {
    console.error('Connection test failed:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
