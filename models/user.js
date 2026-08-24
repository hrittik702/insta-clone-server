const { name } = require('ejs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: {
    type: Number,
    default: 0,
  },
  followings: {
    type: Number,
    default: 0,
  },
  bio: {
    type: String,
  },
  posts: {
    type: Number,
    default: 0,
  },
});

const user = mongoose.model('user', userSchema);

module.exports = user;
