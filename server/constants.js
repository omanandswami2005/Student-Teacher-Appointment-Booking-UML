/**
 * Constants used throughout the application.
 * @module constants
 */

/**
 * Name of the MongoDB database.
 * @constant
 * @type {string}
 * @default
 */
constants.DB_Name = 'student-teacher-booking';

/**
 * Format of logs when using the morgan middleware.
 * @constant
 * @type {string}
 * @default
 */
constants.morganFormat = ':method :url :status :response-time ms';

/**
 * URL of the client application.
 * @constant
 * @type {string}
 * @default
 */
constants.client = 'http://localhost:5173';

module.exports = constants;

