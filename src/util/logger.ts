import {createLogger, Logger, transports} from 'winston'; // import logging library
import MissingEnvironmentVariablesError from './errors/missingEnvironmentVariablesError.js';
import {defaultFormat} from './logFormats.js';

const requiredEnvVariables = [
  'NODE_ENV'
];

const requiredEnvExists = () => requiredEnvVariables.every(e => Object.keys(process.env).includes(e)); // returns true if required env vars exists

// creates configured logger function
function createCustomLogger() {
  if (!requiredEnvExists())
    throw new MissingEnvironmentVariablesError(...requiredEnvVariables.filter(v => !Object.values(process.env).includes(v)));

  return createLogger({
    format: defaultFormat, // set format
    // set log level
    // 'debug' shows debug, verbose, http, info, warn and error messages
    // 'http' shows http, info, warn and error messages
    level: process.env.NODE_ENV == 'dev' ? 'debug' : 'http',
    exitOnError: false,
    // set transports (outputs) for logging
    transports: [
      new transports.Console(),
      new transports.File({filename: 'app.log'}),
    ]
  });
}

const logger: Logger = createCustomLogger(); // declare singleton loggers

export default logger;