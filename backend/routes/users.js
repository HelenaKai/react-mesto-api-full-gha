const router = require('express').Router();

const {
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

const {
  validationUserId,
  validationUpdateUser,
  validationUpdateAvatar,
} = require('../middlewares/validation');

// Получить данные о всех пользователях
router.get('/', getUsers);

// Получения информации о пользователе
router.get('/me', getUserInfo);

// Получить данные о пользователе по id
router.get('/:userId', validationUserId, getUserId);

// Обновление данных
router.patch('/me', validationUpdateUser, updateUser);

// Обновление данных avatar
router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
