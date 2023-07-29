import {createLogger, LogCallback, Logger, transports} from 'winston'; // import logging library
import {defaultFormat} from './logFormats.js';

// create general logger (for example, info, debug, warn, error)
const generalLogger: Logger = createLogger({
  format: defaultFormat, // set format
  // set log level
  // 'debug' shows debug, verbose, http, info, warn and error messages
  // 'http' shows http, info, warn and error messages
  level: process.env.NODE_ENV == 'dev' ? 'debug' : 'info',
  exitOnError: false,
  // set transports (outputs) for logging
  transports: [
    new transports.Console(),
    new transports.File({filename: 'app.log'}), // save general logs to file
  ]
});

// create logger only for http requests (for example, GET /api/users)
const httpLogger = createLogger({
  format: defaultFormat,
  // set log level
  level: 'http',
  exitOnError: false,
  transports: [
    new transports.Console(),
    new transports.File({filename: 'http.log'}) // save https logs to different file
  ]
});

// create logger wrapper object
const logger = {
  info: (message: string, callback?: LogCallback) => generalLogger.info(message, callback),
  debug: (message: string, callback?: LogCallback) => generalLogger.debug(message, callback),
  warn: (message: string, callback?: LogCallback) => generalLogger.warn(message, callback),
  error: (message: string, callback?: LogCallback) => generalLogger.error(message, callback),
  verbose: (message: string, callback?: LogCallback) => generalLogger.verbose(message, callback),
  http: (message: string, callback?: LogCallback) => httpLogger.http(message, callback) // send http logs to http logger
};

export default logger;