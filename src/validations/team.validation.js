const Joi = require('joi');

// Validators
const { password, objectId } = require('./custom.validation');

// Create Team Validator
const createTeam = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    startDate: Joi.date().iso().empty('').allow(null),
    endDate: Joi.date().iso().empty('').allow(null),
    status: Joi.string().allow(null, ''),
  }),
};

// Get Teams Validator
const getTeams = {
  query: Joi.object().keys({
    name: Joi.string(),
    // startDate: Joi.string(),
    // endDate: Joi.string(),
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Get Team Validator
const getTeam = {
  params: Joi.object().keys({
    teamId: Joi.string().custom(objectId),
  }),
};

// Search Team Validator
const searchTeam = {
  query: Joi.object().keys({
    name: Joi.string().allow(null, ''),
    startDate: Joi.string().allow(null, ''),
    endDate: Joi.string().allow(null, ''),
    status: Joi.string().allow(null, ''),
  }),
};

// Update Team Validator
const updateTeam = {
  params: Joi.object().keys({
    teamId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().allow(null, ''),
      startDate: Joi.date().iso().empty('').allow(null),
      endDate: Joi.date().iso().empty('').allow(null),
      status: Joi.string().allow(null, ''),
    })
    .min(1),
};

// Delete Team Validator
const deleteTeam = {
  params: Joi.object().keys({
    teamId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
  searchTeam,
};
