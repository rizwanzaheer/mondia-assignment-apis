const toJSON = require('./toJSON.plugin');
const paginate = require('./paginate.plugin');
const mongooseErrorHandler = require('./mongoose_errorhandler.plugin');

module.exports = {
  toJSON,
  paginate,
  mongooseErrorHandler,
};
