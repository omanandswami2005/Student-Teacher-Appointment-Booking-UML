/**
 * Logger module for the server.
 * Uses winston for logging and outputs to console.
 * @module logger
 */

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, colorize } = format;

/**
 * Logger object that combines colorized logs with json and timestamp.
 * @constant
 * @type {Object}
 */
const logger = createLogger({
  level: 'info',
  format: combine(colorize(), timestamp(), json()),
  transports: [
    new transports.Console({
      format: combine(colorize(), timestamp(), json()),
    }),

  ],
});

module.exports = logger;

