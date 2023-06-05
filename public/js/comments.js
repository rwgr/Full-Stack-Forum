import axios from 'axios';
const slugify = require('slugify');

export const createComment = async (username, commentTextContent, title) => {
  try {
    let slug = slugify(title, { lower: true });

    const res = await axios({
      method: 'POST',
      url: `/posts/${slug}`,
      data: {
        commentTextContent,
        username,
        title,
      },
    });

    if (res.data.status === 'success') {
      alert('Post created!');
      window.setTimeout(() => {
        location.assign(`/posts/${slug}`);
      }, 1500);
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteComment = async (commentId, title, username) => {
  try {
    let slug = slugify(title, { lower: true });
    const res = await axios({
      method: 'DELETE',
      url: `/posts/${slug}`,
      data: {
        commentId,
      },
    });

    if (res.status === 204) {
      alert('Comment deleted!');
      window.setTimeout(() => {
        location.assign(`/user/${username}`);
      }, 1500);
    } else {
      console.log(res);
    }
  } catch (err) {
    console.log(err.message);
  }
};
