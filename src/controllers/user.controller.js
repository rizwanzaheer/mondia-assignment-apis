const httpStatus = require('http-status');

// Services
const { userService } = require('../services');

// Utils
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

// Create User
const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

// Get all users
const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'lastName', 'email', 'role', 'teamCode', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

// get specific user
const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

// Search user by name
const searchUserByName = catchAsync(async (req, res) => {
  const options = pick(req.query, ['name']);
  console.log('options is: ', options);
  const user = await userService.searchUserByName(req.query.name);
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

// Update specific user
const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

// Delete specific user
const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  searchUserByName,
};
