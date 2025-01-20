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
