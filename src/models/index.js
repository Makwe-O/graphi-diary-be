import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();

const additionalParams = { useNewUrlParser: true, useUnifiedTopology: true };
const env = process.env.NODE_ENV;

const connectDb = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  mongoose.connect(config[env].MONGODB_URI, additionalParams);
// eslint-disable-next-line no-console
console.log('process.env.MONGODB_URI_DEV', config[env].MONGODB_URI);

export default connectDb;
