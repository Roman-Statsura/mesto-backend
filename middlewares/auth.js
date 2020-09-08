const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');
const { secretKey } = require('../secretKey');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new Unauthorized('Необходима авторизация'));
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;

  next();
};
