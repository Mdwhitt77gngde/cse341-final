// controllers/projects.js
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const cursor = await mongodb.getDatabase().db().collection('projects').find();
    const items = await cursor.toArray();
    return res.status(200).json(items);
  } catch (err) {
    console.error('getAll projects error:', err);
    return res.status(500).json({ message: 'Could not get projects.' });
  }
};

const getSingle = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const doc = await mongodb.getDatabase().db().collection('projects').findOne({ _id: new ObjectId(id) });
    if (!doc) return res.status(404).json({ message: 'Project not found' });
    return res.status(200).json(doc);
  } catch (err) {
    console.error('getSingle project error:', err);
    return res.status(500).json({ message: 'Could not get project.' });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, description, ownerId, members } = req.body;
    const project = { title, description: description || '', ownerId: ownerId ? new ObjectId(ownerId) : null, members: (members || []).map(m => new ObjectId(m)), status: 'active', createdAt: new Date() };
    const response = await mongodb.getDatabase().db().collection('projects').insertOne(project);
    if (response.acknowledged) return res.status(201).json({ id: response.insertedId });
    return res.status(500).json({ message: 'Could not create project' });
  } catch (err) {
    console.error('createProject error:', err);
    return res.status(500).json({ message: 'Could not create project' });
  }
};

const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const update = { ...req.body };
    if (update.ownerId) update.ownerId = new ObjectId(update.ownerId);
    if (update.members) update.members = update.members.map(m => new ObjectId(m));
    const response = await mongodb.getDatabase().db().collection('projects').updateOne({ _id: new ObjectId(id) }, { $set: update });
    if (response.matchedCount === 0) return res.status(404).json({ message: 'Project not found' });
    return res.status(204).send();
  } catch (err) {
    console.error('updateProject error:', err);
    return res.status(500).json({ message: 'Could not update project' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const response = await mongodb.getDatabase().db().collection('projects').deleteOne({ _id: new ObjectId(id) });
    if (response.deletedCount === 0) return res.status(404).json({ message: 'Project not found' });
    return res.status(204).send();
  } catch (err) {
    console.error('deleteProject error:', err);
    return res.status(500).json({ message: 'Could not delete project' });
  }
};

module.exports = { getAll, getSingle, createProject, updateProject, deleteProject };
