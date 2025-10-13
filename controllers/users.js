// controllers/users.js
const mongodb = require('../data/database');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

const SALT_ROUNDS = 10;

// GET /users
const getAll = async (req, res) => {
  try {
    const cursor = await mongodb.getDatabase().db().collection('users').find({}, { projection: { password: 0 } });
    const users = await cursor.toArray();
    return res.status(200).json(users);
  } catch (err) {
    console.error('getAll users error:', err);
    return res.status(500).json({ message: 'Could not get users.' });
  }
};

// GET /users/:id
const getSingle = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const user = await mongodb.getDatabase().db().collection('users').findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  } catch (err) {
    console.error('getSingle user error:', err);
    return res.status(500).json({ message: 'Could not get user.' });
  }
};

// POST /users (register)
const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing required fields' });
    const db = mongodb.getDatabase().db();
    const existing = await db.collection('users').findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const userDoc = { email, password: hash, name: name || '', createdAt: new Date() };
    const result = await db.collection('users').insertOne(userDoc);
    if (result.acknowledged) return res.status(201).json({ id: result.insertedId });
    return res.status(500).json({ message: 'Could not create user' });
  } catch (err) {
    console.error('createUser error:', err);
    return res.status(500).json({ message: 'Could not create user' });
  }
};

// PUT /users/:id
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const update = { ...req.body };
    if (update.password) {
      update.password = await bcrypt.hash(update.password, SALT_ROUNDS);
    }
    const response = await mongodb.getDatabase().db().collection('users').updateOne({ _id: new ObjectId(id) }, { $set: update });
    if (response.matchedCount === 0) return res.status(404).json({ message: 'User not found' });
    return res.status(204).send();
  } catch (err) {
    console.error('updateUser error:', err);
    return res.status(500).json({ message: 'Could not update user' });
  }
};

// DELETE /users/:id
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: new ObjectId(id) });
    if (response.deletedCount === 0) return res.status(404).json({ message: 'User not found' });
    return res.status(204).send();
  } catch (err) {
    console.error('deleteUser error:', err);
    return res.status(500).json({ message: 'Could not delete user' });
  }
};

module.exports = {
  getAll, getSingle, createUser, updateUser, deleteUser
};
