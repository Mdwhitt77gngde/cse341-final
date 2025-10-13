// routes/projects.js
const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects');
const validate = require('../middleware/validate');
const auth = require('../middleware/authMiddleware');
const Joi = require('joi');

const projectCreate = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  ownerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  members: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).optional()
});

const projectUpdate = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().allow('').optional(),
  ownerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  members: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
  status: Joi.string().valid('active','archived').optional()
});

router.post('/', auth, validate(projectCreate), projectsController.createProject); // protected
router.get('/', projectsController.getAll);
router.get('/:id', projectsController.getSingle);
router.put('/:id', auth, validate(projectUpdate), projectsController.updateProject); // protected
router.delete('/:id', auth, projectsController.deleteProject); // protected

module.exports = router;
