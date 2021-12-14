const httpStatus = require('http-status');

// Models
const { Task } = require('../models');

// Services
const ApiError = require('../utils/ApiError');

/**
 * Create a task
 * @param {Object} taskBody
 * @returns {Promise<Task>}
 */
const createTask = async (taskBody) => {
  return Task.create(taskBody);
};

/**
 * Query for tasks
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTasks = async (filter, options) => {
  const tasks = await Task.paginate(filter, options);
  return tasks;
};

/**
 * Get task by id
 * @param {ObjectId} id
 * @returns {Promise<Task>}
 */
const getTaskById = async (id) => {
  return Task.findById(id);
};

/**
 * Search task by name, user, project, duration, stateDate, endDate
 * @param {string} name
 * @returns {Promise<User>}
 */
const searchTask = async ({ name, project, user, duration }) => {
  return Task.find({
    $or: [
      { name: { $regex: '.*' + name.toLowerCase() + '.*' } },
      { project: { $regex: '.*' + project.toLowerCase() + '.*' } },
      { _user: { $regex: '.*' + user.toLowerCase() + '.*' } },
    ],
  });
  // .select('name lastName email _companies')
  // .populate('_companies', 'officialName commercialName')
  // // .populate('_country')
  // // .populate('_region')
  // .populate('_addresses')
};

/**
 * Update task by id
 * @param {ObjectId} taskId
 * @param {Object} updateBody
 * @returns {Promise<Task>}
 */
const updateTaskById = async (taskId, updateBody) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }

  Object.assign(task, updateBody);
  await task.save();
  return task;
};

/**
 * Delete task by id
 * @param {ObjectId} taskId
 * @returns {Promise<Task>}
 */
const deleteTaskById = async (taskId) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  await task.remove();
  return task;
};

module.exports = {
  createTask,
  queryTasks,
  getTaskById,
  searchTask,
  updateTaskById,
  deleteTaskById,
};
