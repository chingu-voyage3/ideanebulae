import config from './mongoose.config';
import mongoose from 'mongoose';
import Users from '../models/Users';

/**
 * User Service
 *
 * This module contains functions supporting API access to the User information in the database.
 */

/**
 * @description Retrieve the information for a specified user.
 * @param {String} userId - User id specifying which users information is to be retrieved.
 * @returns {Promise} promise - A Promise that when resolved will contain the User Profile 
 * JSON object..
 */
const getUserProfile = (userId) => {
  mongoose.Promise = global.Promise;
  const promise = new Promise((resolve, reject) => {
    mongoose.connect(config.db.mongoURI, {useMongoClient: true,})
    .then(() => {
      const query = Users.findOne({})
      .where('user_id').equals(userId);
      query.exec()
      .then((profile) => {
        resolve(profile);
      })
      .catch((error) => {
        reject(`UserProfile.getUserProfile: Mongoose connect failure - ${error}`);
      });
    });
  });
  return promise;
}; 

export { getUserProfile };