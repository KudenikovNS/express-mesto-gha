module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send(statusCode
    ? { message: 'На сервере произошла ошибка' }
    : { message });
  next();
};
