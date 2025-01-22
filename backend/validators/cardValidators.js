// validators/cardValidators.js
const Joi = require('joi');
const mongoose = require('mongoose');

const createCardSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    'string.empty': 'O campo "name" é obrigatório.',
    'string.min': 'O campo "name" deve ter no mínimo 2 caracteres.',
    'string.max': 'O campo "name" deve ter no máximo 30 caracteres.',
  }),
  link: Joi.string().uri().required().messages({
    'string.empty': 'O campo "link" é obrigatório.',
    'string.uri': 'O campo "link" deve ser uma URL válida.',
  }),
});

const cardIdSchema = Joi.object({
  id: Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }).required().messages({
    'any.invalid': 'O parâmetro "id" deve ser um ID válido.',
  }),
});

const cardLikeDislikeSchema = Joi.object({
  cardId: Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }).required().messages({
    'any.invalid': 'O parâmetro "cardId" deve ser um ID válido.',
  }),
});

module.exports = { createCardSchema, cardIdSchema, cardLikeDislikeSchema };
