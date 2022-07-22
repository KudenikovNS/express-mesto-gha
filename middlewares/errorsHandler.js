module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.send(statusCode
    ? { message: 'На сервере произошла ошибка' }
    : { message });
  next();
};
