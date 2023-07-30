const router = require('express').Router();

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validationCreateCard, validationDeleteCard, validationLikeCard, validationDislikeCard,
} = require('../middlewares/validation');

// Получить данные о всех карточках
router.get('/', getCards);

// Добавить данные
router.post('/', validationCreateCard, createCard);

// Удалить данные
router.delete('/:cardId', validationDeleteCard, deleteCard);

// Добавить лайк
router.put('/:cardId/likes', validationLikeCard, likeCard);

// Удалить лайк
router.delete('/:cardId/likes', validationDislikeCard, dislikeCard);

module.exports = router;
