const express = require('express');
const postRoutes = require('./post.route');

const router = express.Router();

router.use('/post', postRoutes);
router.use('/posts', postRoutes);

module.exports = router;
