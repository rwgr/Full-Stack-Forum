const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createNewPost = catchAsync(async (req, res) => {
  const input = { ...req.body, createdBy: req.user.username };
  const doc = await Post.create(input);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.editPost = catchAsync(async (req, res, next) => {
  const { newTitle, newPostTextContent, newSlug } = req.body;

  const post = await Post.findOne({
    slug: req.body.slug,
  });

  if (!post.id) {
    return next(new AppError('Update was not successful', 404));
  }

  await Post.findByIdAndUpdate(post.id, {
    title: newTitle,
    postTextContent: newPostTextContent,
    slug: newSlug,
  });

  res.status(201).json({
    status: 'success',
    data: null,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const doc = await Post.findByIdAndDelete(req.body.postId);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
