const { ERROR_BAD_REQUEST_CODE } = require('./errors');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_BAD_REQUEST_CODE;
  }
}

module.exports = BadRequestError;
