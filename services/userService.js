import mongoose from 'mongoose';
import config from './mongoose.config';
import User from '../models/user';

mongoose.connect(config.db.mongoURI, {
  useMongoClient: true
});

// See http://mongoosejs.com/docs/promises.html#plugging-in-your-own-promises-library
mongoose.Promise = global.Promise;

// List all the users in the users collection
export const listUsers = async () => {
  return await User.find();
}

// Find a user in the users collection based on the user_id
export const findUser = async (userId) => {
  return await User.findOne({'user_id': userId});
}
