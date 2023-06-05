const Comment = require('../models/commentModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Post = require('../models/postModel.js');
const User = require('../models/userModel.js');

exports.createComment = catchAsync(async (req, res, next) => {
  const { username, title, commentTextContent } = req.body;

  const userId = await User.findOne({ username });
  const post = await Post.findOne({
    title,
  });
  const slug = post.slug;

  const doc = await Comment.create({
    username,
    userId,
    post,
    commentTextContent,
    slug,
    title,
  });

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const doc = await Comment.findByIdAndDelete(req.body.commentId);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
