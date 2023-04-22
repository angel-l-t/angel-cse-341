const routes = require('express').Router();
const routesControllers = require('../controllers')

// Calling functions in specified paths
routes.get('/', routesControllers.allContactsRoute);
routes.get('/:id', routesControllers.oneContactRoute);

module.exports = routes;