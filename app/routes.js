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
routes.get('/users/me', controllers.userController.me);
routes.put('/users', controllers.userController.update);
routes.get('/feed', controllers.userController.feed);

/**
 * Follows
 */
routes.post('/follow/:id', controllers.followController.create);
routes.delete('/unfollow/:id', controllers.followController.destroy);

/**
 * Posts
 */
routes.post('/posts', controllers.postsController.create);
routes.delete('/posts/:id', controllers.postsController.destroy);

/**
 * Comments
 */
routes.post('/posts/:postId/comments/create', controllers.commentsController.create);
routes.delete('/posts/:postId/comments/remove/:id', controllers.commentsController.destroy);

/**
 * Likes
 */
routes.post('/like/:id', controllers.likeController.toggle);

module.exports = routes;
