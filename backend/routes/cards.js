const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:id', deleteCard);

router.put('/likes/:cardId', likeCard);

router.delete('/likes/:cardId', dislikeCard);

module.exports = router;
