const wrapAsync = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch(next); // Pass any errors to the next function
    };
  };

  module.exports = wrapAsync;