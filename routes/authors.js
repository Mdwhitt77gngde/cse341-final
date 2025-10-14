// routes/authors.js
const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const validate = require('../middleware/validate');
const Joi = require('joi');

// Create schema (required fields for POST)
const createSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  bio: Joi.string().allow('').optional(),
  birthdate: Joi.string().optional(),
  nationality: Joi.string().optional()
});

// Update schema (all fields optional for PUT)
const updateSchema = Joi.object({
  firstName: Joi.string().trim().optional(),
  lastName: Joi.string().trim().optional(),
  bio: Joi.string().allow('').optional(),
  birthdate: Joi.string().optional(),
  nationality: Joi.string().optional()
});

// Routes
router.get('/', authorsController.getAll);
router.get('/:id', authorsController.getSingle);

// POST - create author (validated)
router.post('/', validate(createSchema), authorsController.createAuthor);

// PUT - update author (validated)
router.put('/:id', validate(updateSchema), authorsController.updateAuthor);

// DELETE - delete author
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;
