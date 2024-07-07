// app.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./utils/logger');
const constants = require('./constants');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const morganFormat = constants.morganFormat;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to enable CORS
app.use(
  cors(
    {
      origin: 'http://localhost:5173',
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
    (err) => {
      if (err) {
        console.error('CORS error:', err);
      }
    }
  )
);

//Middlerware to URL encode data
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware to Morgan logger
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
