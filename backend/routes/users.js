const router = require('express').Router();
const {
  getUsers, getUserById, getCurrentUser, updateUser, updateUserAvatar,
} = require('../controllers/users');
const { updateUserSchema, updateAvatarSchema, userIdSchema } = require('../validators/userValidators');
const validate = require('../middlewares/validate');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

// Valida o ID do usuário nos parâmetros
router.get('/:id', validate(userIdSchema, 'params'), getUserById);

// Valida os dados enviados para atualização do usuário
router.patch('/me', validate(updateUserSchema), updateUser);

// Valida os dados enviados para atualização do avatar
router.patch('/me/avatar', validate(updateAvatarSchema), updateUserAvatar);

module.exports = router;
