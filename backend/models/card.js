const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        return /^(http:\/\/|https:\/\/)(www\.)?[\w\-.~:/?%#[\]@!$&'()*+,;=]+#?$/.test(v);
      },
      message: (props) => `${props.value} Esse link não é válido!`,
    },
    required: [true, 'Link para a imagem exigido!'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);

// Com Joi

const Joi = require('joi');

// Validação com Joi para os cards
const cardValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    'string.empty': 'O campo "name" é obrigatório.',
    'string.min': 'O campo "name" deve ter no mínimo 2 caracteres.',
    'string.max': 'O campo "name" deve ter no máximo 30 caracteres.',
  }),
  link: Joi.string().uri().required().messages({
    'string.empty': 'O campo "link" é obrigatório.',
    'string.uri': 'O campo "link" deve ser uma URL válida.',
  }),
  owner: Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }).required().messages({
    'string.empty': 'O campo "owner" é obrigatório.',
    'any.invalid': 'O campo "owner" deve ser um ID válido.',
  }),
  likes: Joi.array().items(Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  })).default([]).messages({
    'any.invalid': 'Cada item em "likes" deve ser um ID válido.',
  }),
});

module.exports.cardValidationSchema = cardValidationSchema;
