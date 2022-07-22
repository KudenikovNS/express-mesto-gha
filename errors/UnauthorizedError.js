const { UNAUTH_CODE } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTH_CODE;
  }
}

module.exports = UnauthorizedError;
