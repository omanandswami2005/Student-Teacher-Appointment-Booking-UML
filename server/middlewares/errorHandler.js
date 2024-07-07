// middlewares/errorHandler.js

const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );

  logger.error(err.stack);

    // Check for duplicate key error (MongoDB)
    if (err.code && err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      const errorMessage = `${field} already exists`;
  
      return res.status(400).json({
        success: false,
        error: errorMessage,
      });
    }

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
  
};

module.exports = errorHandler;
