const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  if (!req.cookies.jwt) {
    next(new Unauthorized('Необходима авторизация'));
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret');
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;

  next();
};
