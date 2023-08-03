const { ValidationError, CastError } = require('mongoose').Error;
const Card = require('../models/card');

const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

// Получить данные о всех карточках
const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

// Создать карточку
const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
  /*  .then((card) => res.status(201).send(card)) */
    .then((card) => {
      card
        .populate('owner')
        .then(() => res.status(201).send(card))
        .catch(next);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(error);
      }
    });
};

// Удалить карточку
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findById(cardId)
    .orFail(new NotFoundError('Карточка с указанным id не найдена.'))
    .then((card) => {
      if (card.owner.toString() !== _id) {
        return Promise.reject(new ForbiddenError('У пользователя нет возможности удалять карточки других пользователей'));
      }
      return card.deleteOne();
    })
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error instanceof CastError) {
        next(new BadRequestError('Переданы некорректные данные для удаления карточки.'));
      } else {
        next(error);
      }
    });
};

// Поставить лайк карточке
const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка с указанным id не найдена.'))
    .populate(['owner', 'likes'])
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error instanceof CastError) {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(error);
      }
    });
};

// Удалить лайк карточке
const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка с указанным id не найдена.'))
    .populate(['owner', 'likes'])
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error instanceof CastError) {
        next(new BadRequestError('Переданные данные некорректны'));
      } else {
        next(error);
      }
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
