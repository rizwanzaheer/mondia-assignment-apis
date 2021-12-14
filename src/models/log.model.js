const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Plugins
const { toJSON, paginate, mongooseErrorHandler } = require('./plugins');

const logSchema = new Schema(
  {
    employee_code: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Log',
    },
    loggedTime: {
      type: Date,
    },
    logStartDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
logSchema.plugin(toJSON);
logSchema.plugin(paginate);
logSchema.plugin(mongooseErrorHandler);

/**
 * @typedef Log
 */
const Log = mongoose.model('Log', logSchema);

module.exports = Log;
