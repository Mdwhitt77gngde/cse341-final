// tests/get-books.test.js
const request = require('supertest');
const app = require('../serverAppForTests');
const mongodb = require('../data/database');
const testDB = require('./setupTestDB');

beforeAll(async () => { await testDB.start(); });
afterAll(async () => { await mongodb.getDatabase().close?.(); await testDB.stop(); });

test('GET /books returns 200 and array', async () => {
  const db = mongodb.getDatabase().db();
  await db.collection('books').insertOne({ title: 'T Book', isbn: '000-0', authorId: null });
  const res = await request(app).get('/books');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});
