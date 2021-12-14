const moment = require('moment');

// Config
const config = require('../../src/config/config');
const { tokenTypes } = require('../../src/config/tokens');

// Service
const tokenService = require('../../src/services/token.service');

// User fixture
const { userOne, admin } = require('./user.fixture');

const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
const userOneAccessToken = tokenService.generateToken(userOne._id, accessTokenExpires, tokenTypes.ACCESS);
const adminAccessToken = tokenService.generateToken(admin._id, accessTokenExpires, tokenTypes.ACCESS);

module.exports = {
  userOneAccessToken,
  adminAccessToken,
};
