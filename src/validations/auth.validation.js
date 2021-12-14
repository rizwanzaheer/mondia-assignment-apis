const Joi = require('joi');

// Validator
const { password } = require('./custom.validation');

// Register Validator
const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().allow(null, ''),
    password: Joi.string().required().custom(password),
  }),
};

// Login Validator
const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

// Logout Validator
const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

// Refresh Tokens Validator
const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

// Forgot Password Validator
const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

// Reset Password Validator
const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

// Verify Email Validator
const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
