import mongoose from 'mongoose';
import { logger } from "../utils/chalk.js";

const dbUri: string = process.env.DB_URI as string;

if (!dbUri) {
  throw new Error('DB_URI environment variable is required');
}

let db: mongoose.Connection;

try {
  mongoose.connect(dbUri);
  db = mongoose.connection;
  // logger.db.connect('Connected to DB');
  db.on('connected', () => {
    logger.db.connect(`Connected to DB: ${dbUri.replace(/\/\/.*@/, '//***@')}`); // Hide credentials
  });
  db.on('error', (err) => {
    logger.db.error(`DB Error: ${err.message}`);
  });
  
  db.on('disconnected', () => {
    logger.db.error('DB Disconnected');
  });
} catch (err) {
  logger.db.error(`DB Connection Error: ${(err as Error).message}`);
  throw err; // prevents server start
}

export { db };
