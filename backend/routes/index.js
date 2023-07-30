const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validationCreateUser, validationLogin } = require('../middlewares/validation');

const NotFoundError = require('../errors/notFoundError');

router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрошен несуществующий роут'));
});

module.exports = router;
