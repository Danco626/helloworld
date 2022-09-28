const ejs = require("ejs");
const errorTemplate = require("../views/error");

// Error handler
const errorHandler = (err, req, res, next) => {
  const secrets = req.webtaskContext.secrets;
    const error = secrets.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);

    
    res.end(
      ejs.render(errorTemplate, {
        message: err.message,
        error: error,
        __: res.locals.__,
      })
    );
  
};

module.exports = errorHandler;
