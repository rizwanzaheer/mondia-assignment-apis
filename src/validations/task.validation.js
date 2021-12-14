const Joi = require('joi');

// Validators
const { password, objectId } = require('./custom.validation');

// Create Task Validator
const createTask = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    description: Joi.string().required(),
    teamCode: Joi.string().allow(null, ''),
    project: Joi.string().custom(objectId).allow(null, ''),
    status: Joi.string().allow(null, ''),
  }),
};

// Get Tasks Validator
const getTasks = {
  query: Joi.object().keys({
    name: Joi.string(),
    code: Joi.string(),
    description: Joi.string(),
    project: Joi.string(),
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Get Task Validator
const getTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
};

const searchTask = {
  query: Joi.object().keys({
    code: Joi.string().allow(null, ''),
    name: Joi.string().allow(null, ''),
    project: Joi.string().allow(null, ''),
    user: Joi.string().allow(null, ''),
    status: Joi.string().allow(null, ''),
  }),
};

// Update Task Validator
const updateTask = {
  params: Joi.object().keys({
    taskId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      code: Joi.string(),
      description: Joi.string(),
      project: Joi.custom(objectId),
      logs: Joi.string().allow(null, ''),
      status: Joi.string().allow(null, ''),
    })
    .min(1),
};

// Delete Task Validator
const deleteTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  searchTask,
};
