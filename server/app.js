/**
 * The main Express application.
 * @module app
 */

// Modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./utils/logger');
const constants = require('./constants');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Express app
const app = express();
const morganFormat = constants.morganFormat;

// Middleware

/**
 * Parses incoming requests with JSON payloads.
 */
app.use(express.json());

/**
 * Enable Cross-Origin Resource Sharing.
 */
app.use(
  cors({
    origin: 'stabs.onrender.com',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

/**
 * Serve static files from the 'dist' directory.
 */

app.use(express.static(path.join(__dirname, '/public/dist/')));



/**
 * Parses incoming requests with URL-encoded payloads.
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Parses cookies from the request.
 */
app.use(cookieParser());

/**
 * Parses JSON payloads in the request.
 */
app.use(bodyParser.json());

/**
 * Middleware to log requests.
 */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/**
 * Middleware to Morgan logger.
 */
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

module.exports = app;
