const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Plugins
const { toJSON, paginate, mongooseErrorHandler } = require('./plugins');

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    startDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted', 'banned'],
      default: 'active',
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
teamSchema.plugin(toJSON);
teamSchema.plugin(paginate);
teamSchema.plugin(mongooseErrorHandler);

/**
 * @typedef Team
 */
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
