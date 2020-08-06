const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createNewCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Нет карточки с тaким ID' }));
};

module.exports.likeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { likes: userId },
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Что-то не так' }));
};

module.exports.dislikeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { likes: userId },
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Что-то не так' }));
};
