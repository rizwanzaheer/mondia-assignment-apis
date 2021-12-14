// Package version
const { version } = require('../../package.json');

// Config
const { port, apiVersion } = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Mondia API documentation',
    version,
    // license: {
    //   name: 'MIT',
    //   url: 'https://github.com/rizwanzaheer/',
    // },
  },
  servers: [
    {
      url: `http://localhost:${port}/api/${apiVersion}`,
    },
  ],
};

module.exports = swaggerDef;
