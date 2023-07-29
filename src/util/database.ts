import mongoose from 'mongoose';
import logger from './logger.js';
async function initDatabase() {
  try {
    logger.verbose('Trying to connect to database');
    await mongoose.connect(process.env['MONGO_URL']!);

    logger.info('Connected to database');
  } catch(e) {
    const error = e as Error;

    logger.error(error.message);

    throw e;
  }
}

export default initDatabase;