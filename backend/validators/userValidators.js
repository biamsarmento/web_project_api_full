const Joi = require('joi');
const mongoose = require('mongoose');

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    'string.empty': 'O campo "name" é obrigatório.',
    'string.min': 'O campo "name" deve ter no mínimo 2 caracteres.',
    'string.max': 'O campo "name" deve ter no máximo 30 caracteres.',
  }),
  about: Joi.string().min(2).max(30).required().messages({
    'string.empty': 'O campo "about" é obrigatório.',
    'string.min': 'O campo "about" deve ter no mínimo 2 caracteres.',
    'string.max': 'O campo "about" deve ter no máximo 30 caracteres.',
  }),
});

const updateAvatarSchema = Joi.object({
  avatar: Joi.string().uri().required().messages({
    'string.empty': 'O campo "avatar" é obrigatório.',
    'string.uri': 'O campo "avatar" deve ser uma URL válida.',
  }),
});

const userIdSchema = Joi.object({
  id: Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }).required().messages({
    'any.invalid': 'O parâmetro "id" deve ser um ID válido.',
  }),
});

module.exports = { updateUserSchema, updateAvatarSchema, userIdSchema };
