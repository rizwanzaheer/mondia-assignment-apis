const httpStatus = require('http-status');

// Services
const { projectService } = require('../services');

// Utils
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

// Create project
const createProject = catchAsync(async (req, res) => {
  const project = await projectService.createProject(req.body);
  res.status(httpStatus.CREATED).send(project);
});

// Get all projects
const getProjects = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'lastName', 'email', 'role', 'teamCode', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await projectService.queryProjects(filter, options);
  res.send(result);
});

// get specific project
const getProject = catchAsync(async (req, res) => {
  const project = await projectService.getProjectById(req.params.projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  res.send(project);
});

// Search Project by Name
const searchProjectByName = catchAsync(async (req, res) => {
  const options = pick(req.query, ['name']);
  console.log('options is: ', options);
  const project = await projectService.searchProjectByName(req.query.name);
  if (project.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  res.send(project);
});

// Update specific project
const updateProject = catchAsync(async (req, res) => {
  const project = await projectService.updateProjectById(req.params.projectId, req.body);
  res.send(project);
});

// Delete specific project
const deleteProject = catchAsync(async (req, res) => {
  await projectService.deleteProjectById(req.params.projectId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  searchProjectByName,
};
