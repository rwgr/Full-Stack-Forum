const Post = require('../models/postModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getDefaultView = catchAsync(async (req, res, next) => {
  const posts = await (
    await Post.find().populate('comments').sort('createdAt')
  ).reverse();

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://js.stripe.com/v3/"
    )
    .render('home', {
      title: 'Homepage',
      posts,
    });
});

exports.getNewPost = (req, res, next) => {
  res.status(200).render('newpost', {
    title: 'Create a new post',
  });
};

exports.getEditPost = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({
    slug: req.params.postSlug,
  });
  res.status(200).render('editpost', {
    title: 'Edit your post',
    post,
  });
});

exports.getSignupPage = (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Sign up',
  });
};

exports.getLoginPage = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login',
  });
};

exports.getAccountPage = catchAsync(async (req, res, next) => {
  const userData = await User.findOne({
    username: req.params.username,
  })
    .populate('comments')
    .populate('posts');

  res.status(200).render('account', {
    title: 'Account',
    username: req.params.username,
    userData,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({
    slug: req.params.postSlug,
  }).populate('comments');

  res.status(200).render('post', {
    title: `${post.title}`,
    post,
  });
});

exports.getUpdatePassword = catchAsync(async (req, res, next) => {
  res.status(200).render('updatepassword', {
    title: 'Change My Password',
  });
});
