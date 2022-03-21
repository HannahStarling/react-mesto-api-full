const { ApiError } = require('../errors/ApiError');

// Структурно не совсем верно размещать роут неизвестного маршрута в файл с обработчиком ошибок,
// лучше вынести его в отдельный файл и разместить в папке routes
const handleNotFound = (req, res, next) => next(ApiError.notFound('Маршрут не найден'));

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: `На сервере произошла ошибка ${err}` });
};

module.exports = { errorHandler, handleNotFound };
