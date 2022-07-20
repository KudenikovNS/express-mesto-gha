const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errorsHandler');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { validationForLink } = require('./utils/validationForLink');
const NotFoundError = require('./errors/NotFoundError');
const cors = require('./middlewares/cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors);
app.use(requestLogger);
app.use(cookieParser());
app.use(express.json());

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validationForLink),
    }),
  }),
  createUser,
);

app.use(auth);

app.use(userRouter);
app.use(cardRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.use('*', (req, res, next) => next(new NotFoundError('Запрошен не существующий ресурс')));

app.listen(PORT);
