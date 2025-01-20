const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
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
    required: [true, 'Link para o avatar exigido!'],
  },
  email: {

  },
  password: {

  },
});

module.exports = mongoose.model('user', userSchema);
