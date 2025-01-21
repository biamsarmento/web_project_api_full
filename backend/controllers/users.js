const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: 'Usuário não encontrado.' });
      }

      return bcrypt.compare(password, user.password)
        .then((isPasswordCorrect) => {
          if (!isPasswordCorrect) {
            return res.status(401).send({ message: 'Senha incorreta.' });
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' }
          );

          res.send({ token });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Dados inválidos fornecidos.' });

      if (err.name === 'CastError') return res.status(404).send({ message: 'Usuário não encontrado.' });

      return res.status(500).send({ message: err.message });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Dados inválidos fornecidos.' });

      if (err.name === 'CastError') return res.status(404).send({ message: 'Usuário não encontrado.' });

      return res.status(500).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name = 'Jacques Cousteau',
    about = 'Explorer',
    avatar = 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    email,
    password,
  } = req.body;

  if (!password) {
    return res.status(400).send({ message: 'A senha é obrigatória.' });
  }

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      return User.create({ name, about, avatar, email, password: hashedPassword });
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Dados inválidos fornecidos. ${err.message}` });
      }
      if (err.code === 11000) {
        return res.status(409).send({ message: 'O e-mail já está em uso.' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: `Dados inválidos fornecidos. ${err.message}` });
      if (err.name === 'CastError') return res.status(404).send({ message: 'Usuário não encontrado.' });
      return res.status(500).send({ message: err.message });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: `Dados inválidos fornecidos. ${err.message}` });
      if (err.name === 'CastError') return res.status(404).send({ message: 'Usuário não encontrado.' });
      return res.status(500).send({ message: err.message });
    });
};
