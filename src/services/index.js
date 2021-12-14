const authService = require('./auth.service');
const emailService = require('./email.service');
const tokenService = require('./token.service');
const userService = require('./user.service');
const teamService = require('./team.service');
const taskService = require('./task.service');
const projectService = require('./project.service');

module.exports = {
  authService,
  emailService,
  tokenService,
  userService,
  teamService,
  taskService,
  projectService,
};
