require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, logout, createUser } = require('./controllers/users');
const { errorHandler, handleNotFound } = require('./middlewars/errorHandler');
const { validateUser } = require('./validation/validation');
const { auth } = require('./middlewars/auth');
const { requestLogger, errorLogger } = require('./middlewars/logger');
const { startCrashTest } = require('./middlewars/crashTest');

const { PORT = 3000 } = process.env;

const app = express();

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
});

app.use(cors(corsOptions));
app.options('*', cors());
app.use(helmet()); // Content-Security-Policy
app.use(limiter); // rate limiting middleware to all requests
app.use(cookieParser());
app.use(express.json()); // bodyParser in framework
app.use(requestLogger);
app.get('/crash-test', startCrashTest);
app.post('/signin', validateUser, login);
app.post('/signup', validateUser, createUser);
app.delete('/signout', logout);

app.use(auth);
app.use(userRouter);
app.use(cardRouter);
app.use(errorLogger);
app.use(errors()); // celebrate error handler
app.use(handleNotFound);
app.use(errorHandler);

const start = async () => {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();
