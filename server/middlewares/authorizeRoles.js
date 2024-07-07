const ApiError = require('../utils/ApiError');

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.user.role)) {
      return next(new ApiError(403, 'Forbidden'));
    }
    next();
  };
}

module.exports = { authorizeRoles };
