const httpStatus = require('http-status');

// Services
const { taskService } = require('../services');

// Utils
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

// Create task
const createTask = catchAsync(async (req, res) => {
  const task = await taskService.createTask(req.body);
  res.status(httpStatus.CREATED).send(task);
});

// Get all tasks
const getTasks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'code', 'description', 'project', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await taskService.queryTasks(filter, options);
  res.send(result);
});

// get specific task
const getTask = catchAsync(async (req, res) => {
  const task = await taskService.getTaskById(req.params.taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  res.send(task);
});

// Search Task
const searchTask = catchAsync(async (req, res) => {
  const options = pick(req.query, ['name', 'code', 'description', 'project', 'user', 'status', 'duration']);
  console.log('options is: ', options);
  const task = await taskService.searchTask(options);
  if (task.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  res.send(task);
});

// Update specific task
const updateTask = catchAsync(async (req, res) => {
  const task = await taskService.updateTaskById(req.params.taskId, req.body);
  res.send(task);
});

// Delete specific task
const deleteTask = catchAsync(async (req, res) => {
  await taskService.deleteTaskById(req.params.taskId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  searchTask,
};
