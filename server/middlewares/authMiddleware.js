// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user'); // Assuming a User model

const authMiddleware = async (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization').replace('Bearer ', '');

  // Verify token
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
