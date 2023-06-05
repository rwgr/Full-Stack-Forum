import axios from 'axios';
const slugify = require('slugify');

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/user/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      alert('Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    alert(err.message);
  }
};

export const signup = async (username, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/user/signup',
      data: {
        username,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      alert('Signed up and logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    alert(err.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/user/logout',
    });
    if ((res.data.status = 'success')) location.reload(true);
  } catch (err) {
    alert('Error logging out! Try again.');
  }
};

export const deletePost = async (postId, slug, username) => {
  try {
    console.log(postId, slug, username);
    const res = await axios({
      method: 'DELETE',
      url: `/user/${username}`,
      data: {
        postId,
      },
    });

    if (res.status === 204) {
      alert('Post deleted!');
      window.setTimeout(() => {
        location.assign(`/user/${username}`);
      }, 1500);
    } else {
      console.log(res);
    }
  } catch (err) {
    alert('Error', err.message);
  }
};

export const updatePassword = async (data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/update-password',
      data,
    });

    if (res.data.status === 'success') {
      alert('Your password was updated successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    alert(
      'An error occurred. Please try again ensuring that your current password is correct, and that the new passwords are matching.',
      err.message
    );
  }
};
