const { LINK_REGEXP } = require('./constants');

module.exports.linkValidation = (url, helpers) => {
  if (LINK_REGEXP.test(url)) {
    return url;
  }
  return helpers.error('Ошибка адреса url');
};
