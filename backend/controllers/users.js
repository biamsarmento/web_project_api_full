const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const err = new Error('Usuário não encontrado.');
        err.status = 401;
        throw err;
      }

      return bcrypt.compare(password, user.password)
        .then((isPasswordCorrect) => {
          if (!isPasswordCorrect) {
            const err = new Error('Senha incorreta.');
            err.status = 401;
            throw err;
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' }
          );

          res.send({ token });
        });
    })
    .catch(next); // Encaminha qualquer erro para o middleware
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      const err = new Error('Usuário não encontrado.');
      err.status = 404;
      throw err;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(() => {
      const err = new Error('Usuário não encontrado.');
      err.status = 404;
      throw err;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name = 'Jacques Cousteau',
    about = 'Explorer',
    avatar = 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    email,
    password,
  } = req.body;

  if (!password) {
    const err = new Error('A senha é obrigatória.');
    err.status = 400;
    throw err;
  }

  bcrypt.hash(password, 10)
    .then((hashedPassword) => User.create({ name, about, avatar, email, password: hashedPassword }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.status = 400;
      } else if (err.code === 11000) {
        err.status = 409;
        err.message = 'O e-mail já está em uso.';
      }
      next(err); // Encaminha qualquer erro ao middleware
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(() => {
      const err = new Error('Usuário não encontrado.');
      err.status = 404;
      throw err;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.status = 400;
      }
      next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => {
      const err = new Error('Usuário não encontrado.');
      err.status = 404;
      throw err;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.status = 400;
      }
      next(err);
    });
};
