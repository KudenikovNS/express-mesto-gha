module.exports.validationForLink = (url, helpers) => {
  if (/^https?:\/\/(ww\.)?[-\w]*\.[\w]{2,3}.*$/i.test(url)) {
    return url;
  }
  return helpers.error("Ошибка адреса");
};
