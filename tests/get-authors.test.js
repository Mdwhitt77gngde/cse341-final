// tests/get-authors.test.js
const request = require('supertest');
const appPath = '../server'; // but we need express app - easiest: require app via server bootstrap
// We'll require app after DB is initialized in each test

const mongodb = require('../data/database');
const testDB = require('./setupTestDB');

let app;

beforeAll(async () => {
  await testDB.start();
  await new Promise((resolve, reject) => {
    mongodb.initDb((err) => err ? reject(err) : resolve());
  });
  app = require('../serverAppForTests');
});


afterAll(async () => {
  await mongodb.getDatabase().close?.(); // if using MongoClient, close connection
  await testDB.stop();
});

test('GET /authors returns 200 and array', async () => {
  // seed some data directly
  const db = mongodb.getDatabase().db();
  await db.collection('authors').insertOne({ firstName: 'T', lastName: 'User' });

  const res = await request(app).get('/authors');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});
