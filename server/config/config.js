// config/config.js

require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: '1h',
  },
  // Add other configurations as needed
};

module.exports = config;
