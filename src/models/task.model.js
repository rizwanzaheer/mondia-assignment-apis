const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Plugins
const { toJSON, paginate, mongooseErrorHandler } = require('./plugins');

const taskSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
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
    project: {
      // project Id reference put here
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
    },
    _user: [
      {
        // task related to which user or users
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      },
    ],
    logs: [
      // one task has many logs
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Log',
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
taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);
taskSchema.plugin(mongooseErrorHandler);

/**
 * @typedef Task
 */
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
