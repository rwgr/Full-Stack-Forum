import '@babel/polyfill';
import { createPost, editPost } from './posts.js';
import { createComment, deleteComment } from './comments.js';
import { deletePost } from './users.js';
import { login, signup, logout, updatePassword } from './users.js';

const createPostForm = document.querySelector('.form-create-post');
const editPostForm = document.querySelector('.form-edit-post');
const loginForm = document.querySelector('.form-login');
const signupForm = document.querySelector('.form-signup');
const logOutBtn = document.querySelector('.btn-logout');
const commentForm = document.querySelector('.comment-form');
const deleteBtnsComment = document.querySelectorAll('.btn-delete-comment');
const deleteBtnsPost = document.querySelectorAll('.btn-delete-post');
const updatePassForm = document.querySelector('.form-updatepassword');

if (createPostForm) {
  createPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const postTextContent = document.getElementById('postTextContent').value;
    createPost(title, postTextContent);
  });
}

if (editPostForm) {
  editPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const oldTitle = document.getElementById('oldTitle').textContent;
    const newTitle = document.getElementById('newTitle').value;
    const newPostTextContent =
      document.getElementById('newPostTextContent').value;

    editPost(oldTitle, newTitle, newPostTextContent);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(username, email, password, passwordConfirm);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (commentForm) {
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const commentTextContent = document.getElementById('comment').value;
    const username = document.getElementById('username').textContent;
    const title = document.getElementById('title').textContent;

    createComment(username, commentTextContent, title);
  });
}

if (deleteBtnsComment) {
  for (const deleteBtn of deleteBtnsComment) {
    deleteBtn.addEventListener('click', (e) => {
      const commentId = JSON.parse(deleteBtn.dataset.comment);
      const title = JSON.parse(deleteBtn.dataset.title);
      const username = JSON.parse(deleteBtn.dataset.user);
      deleteComment(commentId, title, username);
    });
  }
}

if (deleteBtnsPost) {
  for (const deleteBtn of deleteBtnsPost) {
    deleteBtn.addEventListener('click', (e) => {
      const postId = JSON.parse(deleteBtn.dataset.post);
      const slug = JSON.parse(deleteBtn.dataset.slug);
      const username = JSON.parse(deleteBtn.dataset.user);
      deletePost(postId, slug, username);
    });
  }
}

if (updatePassForm) {
  updatePassForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').textContent;
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updatePassword({
      username,
      passwordCurrent,
      password,
      passwordConfirm,
    });

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}
