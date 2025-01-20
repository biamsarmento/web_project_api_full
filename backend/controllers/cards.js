const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => Card.findById(card._id).populate('owner'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: `Dados inválidos fornecidos. ${err.message}` });

      return res.status(500).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  const { id } = req.params;

  Card.findByIdAndDelete(id)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Dados inválidos fornecidos.' });

      if (err.name === 'CastError') return res.status(404).send({ message: 'Cartão não encontrado.' });

      return res.status(500).send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Dados inválidos fornecidos.' });
      if (err.name === 'CastError') return res.status(404).send({ message: 'Cartão não encontrado.' });
      return res.status(500).send({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Dados inválidos fornecidos.' });
      if (err.name === 'CastError') return res.status(404).send({ message: 'Cartão não encontrado.' });
      return res.status(500).send({ message: err.message });
    });
};
