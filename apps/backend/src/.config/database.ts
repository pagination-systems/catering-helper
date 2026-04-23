import mongoose from 'mongoose';
import { env } from './env';

const constructDatabaseUrl = (mongoUrl: string, dbName: string): string => {
  if (!mongoUrl) throw new Error('MONGO_URL is not defined in the environment variables');
  if (!dbName) throw new Error('DATABASE_NAME is not defined in the environment variables');
  const url = new URL(mongoUrl);
  url.pathname = `/${dbName}`;

  return url.toString();
};

const connectDB = async (): Promise<typeof mongoose> => {
  // Grab the variables first so we can properly check them
  const mongoUrl = env.MONGO_URL;
  const dbName = env.DATABASE_NAME;

  // This type-narrows the variables so TS knows they are definitely strings, not undefined
  if (!mongoUrl || !dbName) {
    throw new Error('Missing required database environment variables.');
  }

  const DATABASE_URL = constructDatabaseUrl(mongoUrl, dbName);

  try {
    const conn = await mongoose.connect(DATABASE_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection failed:', error);

    // FIX: Throwing the error fixes the TS "lacks return" warning and
    // is better practice than abruptly killing the process here.
    throw error;
  }
};

export { connectDB };
