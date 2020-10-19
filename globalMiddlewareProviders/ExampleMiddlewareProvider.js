/* Middleware functions take params [req, res, next] */

module.exports = (function start() {
  const example = (req, res, next) => {
    // Example function 1
    next();
  };

  return {
    example,
  };
}());
