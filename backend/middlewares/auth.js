const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'my-secret-key');
  } catch (error) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
