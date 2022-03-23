const startCrashTest = () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
};

module.exports = { startCrashTest };
