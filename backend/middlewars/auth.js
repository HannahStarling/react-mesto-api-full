const jwt = require('jsonwebtoken');
const { ApiError } = require('../errors/ApiError');
const { JWT_KEY } = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    throw ApiError.unauthorized();
  }
  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
