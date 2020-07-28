const cardsRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const cardsPath = path.join(__dirname, '../data/cards.json');

cardsRouter.get('/', (req, res) => {
  let cards;
  try {
    const readCardsPath = fs.readFileSync(cardsPath);
    cards = JSON.parse(readCardsPath);
  } catch (err) {
    /* eslint no-console: ["error", { allow: ["error"] }] */
    console.error('Что-то определенно сломалось');
    res.status(500).send({ message: 'Что-то определенно сломалось' });
  }
  if (!cards) {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  } else {
    res.send(cards);
  }
});

module.exports = cardsRouter;
