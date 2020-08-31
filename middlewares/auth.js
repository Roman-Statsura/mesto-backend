const jwt = require('jsonwebtoken');
const { secretKey } = require('../secretKey');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;

  next();
};
