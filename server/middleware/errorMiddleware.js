const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  let statusCode = res.statusCode >= 400 ? res.statusCode : 500;

  if (err.name === 'CastError') {
    statusCode = 400;
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
  }

  res
    .status(statusCode)
    .json({ message: err.message || 'Internal server error' });
};

export default errorMiddleware;
