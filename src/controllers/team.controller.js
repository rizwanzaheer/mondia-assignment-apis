const httpStatus = require('http-status');

// Services
const { teamService } = require('../services');

// Utils
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

// Create team
const createTeam = catchAsync(async (req, res) => {
  const team = await teamService.createTeam(req.body);
  res.status(httpStatus.CREATED).send(team);
});

// Get all teams
const getTeams = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await teamService.queryTeams(filter, options);
  res.send(result);
});

// get specific team
const getTeam = catchAsync(async (req, res) => {
  const team = await teamService.getTeamById(req.params.teamId);
  if (!team) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  }
  res.send(team);
});

const searchTeam = catchAsync(async (req, res) => {
  const options = pick(req.query, ['name', 'startDate', 'endDate', 'status']);
  console.log('options is: ', options);
  const team = await teamService.searchTeam(options);
  if (team.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  }
  res.send(team);
});

// Update specific team
const updateTeam = catchAsync(async (req, res) => {
  const team = await teamService.updateTeamById(req.params.teamId, req.body);
  res.send(team);
});

// Delete specific team
const deleteTeam = catchAsync(async (req, res) => {
  await teamService.deleteTeamById(req.params.teamId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
  searchTeam,
};
