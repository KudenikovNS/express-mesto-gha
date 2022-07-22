const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkValidation } = require('../utils/linkValidation');
const {
  getCards,
  deleteCard,
  createCard,
  setLike,
  removeLike,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(linkValidation),
    }),
  }),
  createCard,
);

router.delete(
  '/cards/:cardID',
  celebrate({
    params: Joi.object().keys({
      cardID: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteCard,
);

router.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }),
  setLike,
);

router.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }),
  removeLike,
);

module.exports = router;
