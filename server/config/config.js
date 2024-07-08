/**
 * Configuration module for the server.
 * Contains various configurations for the server application.
 * @module config
 */

// Importing dotenv module for environment variable loading
require('dotenv').config();

/**
 * Configuration object for the server application.
 * @constant
 * @type {Object}
 * @property {number} port - The port number on which the server will run. Defaults to 3000.
 * @property {Object} db - Configuration for the database connection.
 * @property {string} db.uri - The URI for the database connection.
 * @property {Object} jwt - Configuration for JSON Web Tokens.
 * @property {string} jwt.secret - The secret key for generating JWTs.
 * @property {string} jwt.expiration - The expiration time for JWTs. Defaults to 1 hour.
 */
const config = {
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: '1h',
  },
};

module.exports = config;
