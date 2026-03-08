import winston from 'winston';

// Create logger to log messages

const logger = winston.createLogger({
    // Log any messages from log and above(ignore debug)
    level: 'info',
    format: winston.format.combine(
        // Add timestamp to every log
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        // Set the print format
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`
        })
    ),
    transports: [
        // Print to terminal
        new winston.transports.Console(),
        // Save all logs to app.log file
        new winston.transports.File({ filename: 'logs/app.log' }),
        // Save error log separately
        new winston.transports.File({ filename: 'logs/app/log', level: 'error' }),
    ]
})

export default logger;