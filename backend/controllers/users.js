const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ValidationError, CastError } = require('mongoose').Error;
const User = require('../models/user');

const UnauthorizedError = require('../errors/unauthorizedError');
const ConflictError = require('../errors/conflictError');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');

// Получить данные о всех пользователях
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

// Создать пользователя
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      next(err);
      return;
    }

    User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => {
        res.status(201).send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        });
      })
      .catch((error) => {
        if (error.code === 11000) {
          next(new ConflictError('Пользователь с таким email уже существует.'));
        } else if (error instanceof ValidationError) {
          next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
        } else {
          next(error);
        }
      });
  });
};

// Получить данные о пользователе по userId
const getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError('Пользователь не найден.'))
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error instanceof CastError) {
        next(new BadRequestError('Переданы данные пользователя с некорректным id.'));
      } else {
        next(error);
      }
    });
};

// Обновление данных user
const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь не найден.'))
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      } else {
        next(error);
      }
    });
};

// Обновление данных user -> avatar
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'));
      } else {
        next(error);
      }
    });
};

// Авторизация
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => new UnauthorizedError('Неправильные почта или найден'))

    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((validUser) => {
          if (validUser) {
            const token = jwt.sign({ _id: user._id }, 'my-secret-key', { expiresIn: '7d' });
            res.send({ token });
          } else {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
        })
        .catch(next);
    })
    .catch(next);
};

// Получить данные о пользователе
const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch((error) => next(error));
};

module.exports = {
  createUser,
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
  login,
  getUserInfo,
};
