const Joi = require('joi');

// Validators
const { password, objectId } = require('./custom.validation');

// Create User Validator
const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    teamCode: Joi.string().allow(null, ''),
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid('user', 'admin'),
    status: Joi.string().allow(null, ''),
  }),
};

// Get Users Validator
const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    teamCode: Joi.string(),
    role: Joi.string(),
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Get User Validator
const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const searchUserByName = {
  query: Joi.object().keys({
    name: Joi.string().allow(null, ''),
  }),
};

// Update User Validator
const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
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

// Delete User Validator
const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  searchUserByName,
};
