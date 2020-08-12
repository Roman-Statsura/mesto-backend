const cardsRouter = require('express').Router();
const {
  getAllCards,
  createNewCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getAllCards);

cardsRouter.post('/', createNewCard);

cardsRouter.delete('/:id', deleteCardById);

cardsRouter.put('/:id/likes', likeCard);

cardsRouter.delete('/:id/likes', dislikeCard);

module.exports = cardsRouter;
