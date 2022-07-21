module.exports.validationForLink = (url, helpers) => {
  if (/^https?:\/\/(www\.)?[-\w]*\.[\w]{2,3}.*$/i.test(url)) {
    return url;
  }
  return helpers.error('Ошибка адреса');
};
