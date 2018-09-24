var winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'app.log' })
  ]
});

module.exports = logger;