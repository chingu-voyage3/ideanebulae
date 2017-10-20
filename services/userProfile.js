import config from './mongoose.config';
import mongoose from 'mongoose';
import Users from '../models/Users';

/**
 * User Service
 *
 * This module contains functions supporting API access to the User information
 * in the database.
 */

/**
 * @description Add the profile information for a specified user.
 * @param {Object} userProfile - An object containing the users profile
 * information that is to be added.
 * @returns {Promise} promise - A Promise that when resolved will contain 
 * information about the final state of the request. */
const addUserProfile = (userProfile) => {
  // TODO: Complete this function
};

/**
 * @description Delete the profile information for a specified user.
 * @param {String} userId - User id specifying which users information is to be
 * deleted.
 * @returns {Object} promise - A promise which when resolved will contain
 * information about the final state of the request.
 */
const deleteUserProfile = (userId) => {
  mongoose.Promise = global.Promise;
  const promise = new Promise((resolve, reject) => {
    mongoose.connect(config.db.mongoURI, {useMongoClient: true,})
    .then(() => {
      User.findOneAndRemove({ username: `${userId}` }, function(err) {
        const requestState = { 
          action: 'deleteUserProfile',
          parm: userId,
          finalState: '',
        }
        requestState.finalState = err ? 'failed' : 'success';
        resolve(requestState); 
      })       
    })
    .catch((error) => {
      reject(`UserProfile.deleteUserProfile: Mongoose connect failure - ${error}`);
    });
  });
  return promise;
}; 

/**
 * @description Retrieve the information for a specified user.
 * @param {String} userId - User id specifying which users information is to be
 * retrieved.
 * @returns {Promise} promise - A Promise that when resolved will contain the
 * User Profile JSON object.
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

/**
 * @description Update the profile information for a specified user.
 * @param {Object} userProfile - An object containing the users profile
 * information that is to be updated.
 * @returns {Promise} promise - A Promise that when resolved will contain 
 * information about the final state of the request.
 */
const updateUserProfile = (userProfile) => {
  // TODO: Complete this function
};

export { addUserProfile, deleteUserProfile, getUserProfile, updateUserProfile };