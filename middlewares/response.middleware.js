const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (!res.err) {
    res.status(200).send(res.data);
  } else {
    const errorData = {
      error: true,
      message: res.err.message,
    };
    res.status(res.err.name).send(errorData);
  }
  next();
};

export { responseMiddleware };
