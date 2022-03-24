const jwt = require('jsonwebtoken');
const { ApiError } = require('../errors/ApiError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'brillian-secret-key');
  } catch (err) {
    throw ApiError.unauthorized();
  }
  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
