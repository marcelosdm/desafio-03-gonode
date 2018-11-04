const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const authMiddleware = require('./middlewarers/auth');

const controllers = requireDir('./controllers');

/**
 * Auth
 */
routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

/**
 * Auth routes
 */
routes.use(authMiddleware);

/**
 * Users
 */
routes.put('/users', controllers.userController.update);

/**
 * Posts
 */
routes.post('/posts', controllers.postsController.create);
routes.delete('/posts/:id', controllers.postsController.destroy);

module.exports = routes;
