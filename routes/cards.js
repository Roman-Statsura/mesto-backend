const cardsRouter = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const cardsPath = path.join(__dirname, '../data/cards.json');

cardsRouter.get('/', (req, res) => {
  fsPromises.readFile(cardsPath, { encoding: 'utf8' })
    .then((data) => {
      const cards = JSON.parse(data);
      if (!cards) {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      } else {
        res.send(cards);
      }
    })
    .catch((err) => {
      /* eslint no-console: ["error", { allow: ["error"] }] */
      console.error(err.message);
      console.error('Что-то определенно сломалось');
      res.status(500).send({ message: 'Что-то определенно сломалось' });
    });
});

module.exports = cardsRouter;
