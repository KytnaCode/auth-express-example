// Entry point

import logger from './util/logger.js';
import createApp from './app.js';
import {config} from 'dotenv';
import MissingEnvironmentVariablesError from './util/errors/missingEnvironmentVariablesError.js';

const requiredEnvVariables = [
  'PORT',
  'MONGO_URL',
  'NODE_ENV'
];

if (!requiredEnvVariables.every(e => Object.keys(process.env).includes(e)))
  throw new MissingEnvironmentVariablesError(requiredEnvVariables.filter(e => !Object.keys(process.env).includes(e)));

logger.verbose('Environment variables loaded');

logger.verbose('Creating app object');

const app = createApp();

logger.verbose('Getting port');

const port = app.get('port');

logger.info('Starting app');

app.listen(port);

logger.info(`App started on port ${port}`);