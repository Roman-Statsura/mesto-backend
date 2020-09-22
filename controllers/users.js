const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found');
const Unauthorized = require('../errors/unauthorized');
const BadRequest = require('../errors/bad-request');
const Conflict = require('../errors/conflict');

module.exports.login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })
    .catch(() => {
      next(new Unauthorized('Неверная почта или пароль'));
    });
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Нет пользователя с тaким ID'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Объект не найден'));
      }
      return next(new Error('Произошла ошибка'));
    });
};

module.exports.createNewUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!password) {
    return next(new BadRequest('Введите пароль'));
  }
  if (password.length < 8) {
    return next(new BadRequest('Слишком короткий пароль'));
  }
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Введите имя, информацию о себе, ссылку на аватар, почту и пароль'));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new Conflict('Такой пользователь уже существует'));
      }
      return next(new Error('Произошла ошибка'));
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Введите имя и информацию о себе'));
      } else {
        next(new Error('Произошла ошибка'));
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Введите ссылку на аватар'));
      } else {
        next(new Error('Произошла ошибка'));
      }
    });
};
