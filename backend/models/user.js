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

// Validação com Joi
const userValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  about: Joi.string().min(2).max(30).required(),
  avatar: Joi.string()
    .uri()
    .pattern(/^(http:\/\/|https:\/\/)(www\.)?[\w\-.~:/?%#[\]@!$&'()*+,;=]+#?$/)
    .message('O avatar precisa ser uma URL válida.')
    .required(),
  email: Joi.string().email().required().messages({
    'string.email': 'O e-mail fornecido não é válido.',
    'any.required': 'O e-mail é obrigatório.',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'A senha deve conter no mínimo 8 caracteres.',
    'any.required': 'A senha é obrigatória.',
  }),
});

module.exports.userValidationSchema = userValidationSchema;
