const router = require('express').Router();
const {
  getUsers, getUserById, getCurrentUser, updateUser, updateUserAvatar, getUsuario,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:id', getUserById);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
