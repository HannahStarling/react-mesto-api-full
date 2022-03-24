const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
});

const allowedCors = [
  'http://mesto.mshannahstarling.nomoredomains.work',
  'http://api.mesto.hannahstarling.nomoredomains.work',
  'https://mesto.mshannahstarling.nomoredomains.work',
  'https://api.mesto.hannahstarling.nomoredomains.work',
  'mesto.mshannahstarling.nomoredomains.work',
  'api.mesto.hannahstarling.nomoredomains.work',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
];

const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (allowedCors.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const { NODE_ENV, JWT_SECRET, PORT = 3000 } = process.env;
const jwtKey = NODE_ENV !== 'production' ? JWT_SECRET : 'brillian-secret-key';

module.exports = {
  allowedCors,
  corsOptions,
  limiter,
  jwtKey,
  PORT,
};
