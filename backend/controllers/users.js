const User = require('../models/user');

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
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: `Dados inválidos fornecidos. ${err.message}` });

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
