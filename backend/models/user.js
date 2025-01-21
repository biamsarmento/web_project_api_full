const mongoose = require('mongoose');
const validator = require('validator');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /^(http:\/\/|https:\/\/)(www\.)?[\w\-.~:/?%#[\]@!$&'()*+,;=]+#?$/.test(v);
      },
      message: (props) => `${props.value} Esse link não é válido!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} não é um e-mail válido!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
