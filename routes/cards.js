const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { validationForLink } = require("../utils/validationForLink");
const {
  getCard,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/cards", getCard);

router.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validationForLink),
    }),
  }),
  createCard
);

router.delete(
  "/cards/:cardID",
  celebrate({
    params: Joi.object().keys({
      cardID: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteCard
);

router.put(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }),
  likeCard
);

router.delete(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }),
  dislikeCard
);

module.exports = router;
