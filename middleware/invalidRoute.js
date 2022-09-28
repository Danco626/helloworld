// Catch 404 and forward to error handler
const invalidRouter = ((req, res, next) => {
  const err = new Error("notFound404");
  err.status = 404;
  next(err);
});

module.exports = invalidRouter;