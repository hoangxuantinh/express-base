import winston from 'winston'
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: '../../logs/app.log' })]
})
