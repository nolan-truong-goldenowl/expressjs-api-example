const express = require('express');
const { validate } = require('express-validation');
const postController = require('../../controllers/post.controller');
const {
  createPostValidation,
  updatePostValidation,
  removePostValidation,
} = require('../../validations/post.validation');

const router = express.Router();

// GET /api/posts
router.route('/')
  .get(postController.listPost);

// POST /api/posts
router.route('/')
  .post(validate(createPostValidation, { keyByField: true }), postController.createPost);

// GET /api/post/:id
router.route('/:id')
  .get(postController.showPost);

// PATCH /api/post/:id
router.route('/:id')
  .patch(validate(updatePostValidation, { keyByField: true }), postController.updatePost);

// DELETE /api/post/:id
router.route('/:id')
  .delete(validate(removePostValidation, { keyByField: true }), postController.removePost);

module.exports = router;
