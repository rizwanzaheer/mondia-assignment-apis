const winston = require('winston');

// Config
const config = require('./config');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.label({
      label: `Label🏷️`,
    }),
    winston.format.timestamp({
      format: 'DD-MMM-YYYY HH:mm:ss',
    }),
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    // winston.format.printf(({ level, message }) => `${level}: ${message}`)
    // winston.format.printf((info) => `${[info.timestamp]}: ${info.label}: ${info.level}: ${info.message}`)
    winston.format.printf((info) => `${[info.timestamp]}: ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

module.exports = logger;
