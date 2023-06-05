import axios from 'axios';
const slugify = require('slugify');

export const createPost = async (title, postTextContent) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/posts/create-post',
      data: {
        title,
        postTextContent,
      },
    });

    let slug = slugify(title, { lower: true });

    if (res.data.status === 'success') {
      console.log('Post created!');
      alert('Post created!');
      window.setTimeout(() => {
        location.assign(`/posts/${slug}`);
      }, 1500);
    }
  } catch (err) {
    alert(err.message);
  }
};

export const editPost = async (oldTitle, newTitle, newPostTextContent) => {
  try {
    const slug = slugify(oldTitle, { lower: true });

    let newSlug = slugify(newTitle, { lower: true });

    const res = await axios({
      method: 'PATCH',
      url: `/posts/${slug}/editPost`,
      data: {
        slug,
        newSlug,
        newTitle,
        newPostTextContent,
      },
    });

    if (res.data.status === 'success') {
      console.log('Post updated!');
      alert('Post updated!');
      window.setTimeout(() => {
        location.assign(`/posts/${newSlug}`);
      }, 1500);
    }
  } catch (err) {
    alert(err.message);
  }
};
