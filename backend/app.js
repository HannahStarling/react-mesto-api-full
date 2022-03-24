require('dotenv').config();
const express = require('express');
const { connect } = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, logout, createUser } = require('./controllers/users');
const { errorHandler, handleNotFound } = require('./middlewars/errorHandler');
const { validateUser } = require('./validation/validation');
const { auth } = require('./middlewars/auth');
const { requestLogger, errorLogger } = require('./middlewars/logger');
const { startCrashTest } = require('./middlewars/crashTest');
const { PORT, corsOptions, limiter } = require('./utils/constants');

const app = express();

app.use(cors(corsOptions));
app.options('*', cors());
app.use(helmet()); // Content-Security-Policy
app.use(limiter); // rate limiting middleware to all requests
app.use(cookieParser());
app.use(express.json()); // bodyParser in framework
app.use(requestLogger);
// routes
app.get('/crash-test', startCrashTest);
app.post('/signin', validateUser, login);
app.post('/signup', validateUser, createUser);
app.delete('/signout', logout);
app.use(auth);
app.use(userRouter);
app.use(cardRouter);
//  errors
app.use(errorLogger);
app.use(errors()); // celebrate error handler
app.use(handleNotFound);
app.use(errorHandler);

const start = async () => {
  await connect('mongodb://localhost:27017/mestodb');
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();
