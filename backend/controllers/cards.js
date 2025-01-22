const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => Card.findById(card._id).populate('owner'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Dados inválidos fornecidos. ${err.message}` });
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .orFail()
    .then((card) => {
      const ownerId = card.owner.toHexString();
      if (ownerId === req.user._id) {
        return Card.findByIdAndDelete(id)
          .orFail()
          .then((deletedCard) => res.send({ data: deletedCard }));
      }
      return res.status(403).send({ message: 'Você não tem permissão para apagar este cartão.' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Dados inválidos fornecidos.' });
      }
      if (err.name === 'CastError' || err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Cartão não encontrado.' });
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Dados inválidos fornecidos.' });
      }
      if (err.name === 'CastError' || err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Cartão não encontrado.' });
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Dados inválidos fornecidos.' });
      }
      if (err.name === 'CastError' || err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Cartão não encontrado.' });
      }
      next(err);
    });
};
