const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { errorHandler, handleNotFound } = require('./middlewars/errorHandler');
const { validateUser } = require('./validation/validation');
const { auth } = require('./middlewars/auth');
const { requestLogger, errorLogger } = require('./middlewars/logger');

const { PORT = 3000 } = process.env;

const app = express();

const allowedCors = [
  'https://mesto.mshannahstarling.nomoredomains.work',
  'https://api.mesto.hannahstarling.nomoredomains.work',
  'mesto.mshannahstarling.nomoredomains.work',
  'api.mesto.hannahstarling.nomoredomains.work',
  'https://localhost:3000',
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

app.use(cors(corsOptions));

app.options('*', cors()); // include before other routes
app.use(cookieParser());
app.use(express.json()); // bodyParser in framework
app.use(requestLogger);
app.post('/signin', validateUser, login);
app.post('/signup', validateUser, createUser);
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
