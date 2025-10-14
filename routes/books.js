// routes/books.js
const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const validate = require('../middleware/validate');
const Joi = require('joi');

// Create schema for books (POST)
const createSchema = Joi.object({
  title: Joi.string().trim().required(),
  authorId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.pattern.base': 'authorId must be a 24-character hex string'
  }),
  isbn: Joi.string().trim().required(),
  publisher: Joi.string().allow('').optional(),
  publishedDate: Joi.string().optional(),
  pages: Joi.number().integer().positive().optional(),
  genre: Joi.string().optional(),
  summary: Joi.string().allow('').optional()
});

// Update schema for books (PUT) - all fields optional
const updateSchema = Joi.object({
  title: Joi.string().trim().optional(),
  authorId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional().messages({
    'string.pattern.base': 'authorId must be a 24-character hex string'
  }),
  isbn: Joi.string().trim().optional(),
  publisher: Joi.string().allow('').optional(),
  publishedDate: Joi.string().optional(),
  pages: Joi.number().integer().positive().optional(),
  genre: Joi.string().optional(),
  summary: Joi.string().allow('').optional()
});

// Routes
router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);

// POST - create book (validated)
router.post('/', validate(createSchema), booksController.createBook);

// PUT - update book (validated)
router.put('/:id', validate(updateSchema), booksController.updateBook);

// DELETE - delete book
router.delete('/:id', booksController.deleteBook);

module.exports = router;
