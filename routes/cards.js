const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequest = require('../errors/bad-request');
const {
  getAllCards,
  createNewCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getAllCards);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new BadRequest('Здесь должна быть ссылка на картинку');
      } else {
        return value;
      }
    }),
  }),
}), createNewCard);

cardsRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), deleteCardById);

cardsRouter.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), likeCard);

cardsRouter.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), dislikeCard);

module.exports = cardsRouter;
