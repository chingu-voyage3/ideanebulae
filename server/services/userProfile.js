import mongoose from 'mongoose';
import Users from '../models/Users';
import { closeConnection, getConnection, openConnection } from './db';

/**
 * User Service
 *
 * This module contains functions supporting API access to the User information in the database.
 */

/**
 * @description Retrieve the information for a specified user.
 * @param {String} userId - User id specifying which users information is to be retrieved.
 * @returns {String[]} userAttributs - Array of key/value pairs which describe the user.
 */
const getUserProfile = (userId) => {
  console.log(`getUserProfile -> userId:${userId}`);
  openConnection()
  .then(() => {
    mongoose.Promise = global.Promise;
    const query = Users.findOne({})
      .where('user_id').equals(userId);
    query.exec()
      .then((profile) => {
        console.log(`profile.user_name: ${profile}`);
      });
  });
}; 

export { getUserProfile };