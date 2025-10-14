// tests/get-projects.test.js
const request = require('supertest');
const app = require('../serverAppForTests');
const mongodb = require('../data/database');
const testDB = require('./setupTestDB');

beforeAll(async () => { await testDB.start(); });
afterAll(async () => { await mongodb.getDatabase().close?.(); await testDB.stop(); });

test('GET /projects returns 200 and array', async () => {
  const db = mongodb.getDatabase().db();
  await db.collection('projects').insertOne({ title: 'P', description: 'desc', status: 'active', createdAt: new Date() });
  const res = await request(app).get('/projects');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});
