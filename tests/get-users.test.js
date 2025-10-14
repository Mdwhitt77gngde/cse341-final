// tests/get-users.test.js
const request = require('supertest');
const app = require('../serverAppForTests');
const mongodb = require('../data/database');
const testDB = require('./setupTestDB');

beforeAll(async () => { await testDB.start(); });
afterAll(async () => { await mongodb.getDatabase().close?.(); await testDB.stop(); });

test('GET /users returns 200 and array', async () => {
  const db = mongodb.getDatabase().db();
  await db.collection('users').insertOne({ email: 'u@test.com', password: 'fakehash', name: 'U' });
  const res = await request(app).get('/users');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});
