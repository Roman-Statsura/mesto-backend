const Card = require('../models/card');

const NotFoundError = require('../errors/not-found');
const Forbidden = require('../errors/forbidden');
const BadRequest = require('../errors/bad-request');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createNewCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Введите имя карточки и ссылку на картинку'));
      } else {
        next(new Error('Произошла ошибка'));
      }
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail()
    .then((card) => {
      const { owner } = card;
      if (req.user._id === owner.toString()) {
        Card.findByIdAndRemove(req.params.id)
          .then(() => res.send({ message: 'Карточка удалена' }));
      } else {
        throw new Forbidden('Вы не можете удалить чужую карточку');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Нет карточки с тaким ID'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Объект не найден'));
      }
      return next(new Error('Произошла ошибка'));
    });
};

module.exports.likeCard = (req, res, next) => {
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
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Нет карточки с тaким ID'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Объект не найден'));
      }
      return next(new Error('Произошла ошибка'));
    });
};

module.exports.dislikeCard = (req, res, next) => {
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
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Нет карточки с тaким ID'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Объект не найден'));
      }
      return next(new Error('Произошла ошибка'));
    });
};
