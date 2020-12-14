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
        .find(),
      Post
        .find()
        .skip(pagiOptions.skipCount)
        .limit(pagiOptions.pageSize),
    ]);

    res.json(pagiOptions.paginate(postCollectionSerializer(posts), total.length));
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();

    res.json(postSerializer(savedPost));
  } catch (error) {
    next(error);
  }
};

exports.showPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: 'Post not found',
      });
    }
    res.json(postSerializer(post));
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    await Post.updateOne({
      _id: req.params.id,
    }, req.body);

    res.json();
  } catch (error) {
    next(error);
  }
};

exports.removePost = async (req, res, next) => {
  try {
    await Post.deleteOne({
      _id: req.params.id,
    });

    res.json();
  } catch (error) {
    next(error);
  }
};
