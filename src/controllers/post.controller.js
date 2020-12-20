const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const Pagination = require('../utils/Pagination');
const Post = require('../models/post.model');
const { postSerializer, postCollectionSerializer } = require('../serializers/post.serializer');

exports.listPost = async (req, res, next) => {
  try {
    const pagiOptions = new Pagination(req.query);

    const [total, posts] = await Promise.all([
      Post
        .countDocuments(),
      Post
        .find()
        .skip(pagiOptions.skipCount)
        .limit(pagiOptions.pageSize),
    ]);

    res.json({
      posts: postCollectionSerializer(posts),
      meta: pagiOptions.paginate(posts, total),
    });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();

    res
      .status(httpStatus.CREATED)
      .json(postSerializer(savedPost));
  } catch (error) {
    error.statusCode = httpStatus[422];
    next(error);
  }
};

exports.showPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new APIError({
        message: 'Post not found',
        status: httpStatus.NOT_FOUND,
      });
    }

    res.json(postSerializer(post));
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const updatedPost = await Post.updateOne({
      _id: req.params.id,
    }, req.body);

    res.json(postSerializer(updatedPost));
  } catch (error) {
    error.statusCode = httpStatus[422];
    next(error);
  }
};

exports.removePost = async (req, res, next) => {
  try {
    await Post.deleteOne({
      _id: req.params.id,
    });

    res.json({ post: { id: req.params.id } });
  } catch (error) {
    error.statusCode = httpStatus[422];
    next(error);
  }
};
