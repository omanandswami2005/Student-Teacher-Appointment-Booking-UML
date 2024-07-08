const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, colorize } = format;

const consoleLogFormat = format.combine(
  format.colorize(),
  format.simple(),
  format.printf(({ level, message, timestamp }) => {
    return `${level}: ${message}`;
  })
);

const logger = createLogger({
  level: 'info',
  format: combine(colorize(), timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
  ],
});

module.exports = logger;
