module.exports = (function start() {
  const exampleMiddlewareFunction = (req, res, next) => {
    /* INSERT MIDDLEWARE CHECKS */
    next();
  };

  return {
    exampleMiddlewareFunction,
  };
}());
