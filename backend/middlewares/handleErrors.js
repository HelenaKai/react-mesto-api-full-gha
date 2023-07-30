const { ERROR_DEFAULT } = require('../errors/errors');

const handleErrors = (error, req, res, next) => {
  const { statusCode = ERROR_DEFAULT } = error;

  const message = statusCode === ERROR_DEFAULT ? 'На сервере произошла ошибка' : error.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = handleErrors;
