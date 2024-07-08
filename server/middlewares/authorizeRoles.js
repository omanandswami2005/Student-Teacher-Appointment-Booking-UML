const ApiError = require('../utils/ApiError');

/**
 * Middleware function to authorize roles.
 *
 * @param {...string} roles - The roles to be authorized.
 * @returns {function} - The middleware function.
 */
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.user.role)) {
      return next(new ApiError(403, 'Forbidden'));
    }
    next();
  };
}

module.exports = { authorizeRoles };
