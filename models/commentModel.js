const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    commentTextContent: {
      type: String,
      required: [true, 'A comment must include a the comment!'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'Comment must belong to a post.'],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    username: {
      type: String,
      required: [true, 'Comment must belong to a user.'],
    },
    slug: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
