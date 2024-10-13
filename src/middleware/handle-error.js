const handleError = (res, error) => {
  console.error(error);

  const statusCode = error.statusCode || 500;
  const message = error.message || '서버 오류';

  res.status(statusCode).json({ message });
};

module.exports = handleError;