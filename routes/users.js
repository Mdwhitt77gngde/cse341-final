// routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const validate = require('../middleware/validate');
const auth = require('../middleware/authMiddleware');
const Joi = require('joi');

const createSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().allow('').optional()
});

const updateSchema = Joi.object({
  email: Joi.string().email().optional(),
  password: Joi.string().min(8).optional(),
  name: Joi.string().optional()
});

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', validate(createSchema), usersController.createUser); // open registration
router.put('/:id', auth, validate(updateSchema), usersController.updateUser); // protected (only logged in)
router.delete('/:id', auth, usersController.deleteUser); // protected

module.exports = router;
