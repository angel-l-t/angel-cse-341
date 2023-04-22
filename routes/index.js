const routes = require('express').Router();

// Using routes in contacts.js
routes.use('/contacts', require('./contacts'))

module.exports = routes;