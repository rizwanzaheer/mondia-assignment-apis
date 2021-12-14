const Joi = require('joi');

// Validators
const { password, objectId } = require('./custom.validation');

// Create Project Validator
const createProject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    _tasks: Joi.string().allow(null, ''),
    status: Joi.string().allow(null, ''),
  }),
};

// Get Projects Validator
const getProjects = {
  query: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    _tasks: Joi.string(),
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Get Project Validator
const getProject = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(objectId),
  }),
};

// Update Project Validator
const updateProject = {
  params: Joi.object().keys({
    projectId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      teamCode: Joi.string(),
      password: Joi.string().custom(password),
      role: Joi.string(),
      status: Joi.string().allow(null, ''),
    })
    .min(1),
};

// Delete Project Validator
const deleteProject = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(objectId),
  }),
};

// Search Project Validator
const searchProjectByName = {
  query: Joi.object().keys({
    name: Joi.string().allow(null, ''),
  }),
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  searchProjectByName,
};
