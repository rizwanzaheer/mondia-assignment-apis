const express = require('express');

// Routes
const rootRoute = require('./root.route');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const teamRoute = require('./team.route');
const taskRoute = require('./task.route');
const projectRoute = require('./project.route');

// Doc Route
const docsRoute = require('./docs.route');

// Configs
const { env } = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: rootRoute, // Root Route Path
  },
  {
    path: '/auth',
    route: authRoute, // Auth Route Path
  },
  {
    path: '/users',
    route: userRoute, // User Route Path
  },
  {
    path: '/teams',
    route: teamRoute, // Teams Route Path
  },
  {
    path: '/tasks',
    route: taskRoute, // Tasks Route Path
  },
  {
    path: '/projects',
    route: projectRoute, // Projects Route Path
  },
  {
    path: '/docs',
    route: docsRoute, // APIs Documentation Route Path
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute, // APIs Documentation Route Path
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route); // here we only push the dev route in the router instance
  });
}

module.exports = router;
