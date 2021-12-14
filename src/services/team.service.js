const httpStatus = require('http-status');

// Models
const { Team } = require('../models');

// Services
const ApiError = require('../utils/ApiError');

/**
 * Create a team
 * @param {Object} teamBody
 * @returns {Promise<Team>}
 */
const createTeam = async (teamBody) => {
  // if (await Team.isEmailTaken(teamBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  return Team.create(teamBody);
};

/**
 * Query for teams
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTeams = async (filter, options) => {
  const teams = await Team.paginate(filter, options);
  return teams;
};

/**
 * Get team by id
 * @param {ObjectId} id
 * @returns {Promise<Team>}
 */
const getTeamById = async (id) => {
  return Team.findById(id);
};

/**
 * Search team by name
 * @param {string} name
 * @returns {Promise<Team>}
 */
const searchTeam = async ({ name, startDate, endDate }) => {
  return Team.find({
    $or: [
      { name: { $regex: '.*' + name ? name.toLowerCase() : '' + '.*' } },
      // { startDate: { $regex: '.*' + startDate ? startDate.toLowerCase() : '' + '.*' } },
      // { endDate: { $regex: '.*' + endDate ? endDate.toLowerCase() : '' + '.*' } },
      // {startDate:{$gte:ISODate(“2020-03-01”),$lt:ISODate(“2021-04-01”)}}
      //   created_at: {
      //     $gte: ISODate("2010-04-29T00:00:00.000Z"),
      //     $lt: ISODate("2010-05-01T00:00:00.000Z")
      // }
    ],
  });
  // // .select('name lastName email _companies')
  // .populate('_companies', 'officialName commercialName')
  // // .populate('_country')
  // // .populate('_region')
  // .populate('_addresses')
};

/**
 * Update team by id
 * @param {ObjectId} teamId
 * @param {Object} updateBody
 * @returns {Promise<Team>}
 */
const updateTeamById = async (teamId, updateBody) => {
  const team = await getTeamById(teamId);
  if (!team) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  }
  // if (updateBody.email && (await Team.isEmailTaken(updateBody.email, teamId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  Object.assign(team, updateBody);
  await team.save();
  return team;
};

/**
 * Delete team by id
 * @param {ObjectId} teamId
 * @returns {Promise<Team>}
 */
const deleteTeamById = async (teamId) => {
  const team = await getTeamById(teamId);
  if (!team) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  }
  await team.remove();
  return team;
};

module.exports = {
  createTeam,
  queryTeams,
  getTeamById,
  searchTeam,
  updateTeamById,
  deleteTeamById,
};
