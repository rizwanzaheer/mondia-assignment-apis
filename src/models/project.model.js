const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Plugins
const { toJSON, paginate, mongooseErrorHandler } = require('./plugins');

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    _tasks: [
      // one project has many tasks
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Task',
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted', 'banned', 'completed'],
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
projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);
projectSchema.plugin(mongooseErrorHandler);

/**
 * @typedef Project
 */
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
