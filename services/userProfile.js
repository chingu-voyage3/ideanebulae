import User from '../models/users.js';
import { closeConnection, getConnection } from './db';

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
  const query = `{ user_id: { $eq: ${userId} } }`;
  console.log(`getUserProfile -> query:${query}`);
  get((_db) => {
    _db.collection('Users').find(query)
      .toArray((err, docs) => {
        // TODO: Clean up error handling logic to throw a proper error
        if (err) {
          console.log('DB Find Error', err);
        }
        if (docs && docs.length > 0) {
          return cb(docs);
        }
        return cb(null);
      });
  });}; 

/**
 * @description 
 * @param {any} query 
 * @param {function} cb - Callback function to be invoked once the connection has been established
 */
const find = (query, cb) => {
  get((_db) => {
    _db.collection('users').find(query)
      .toArray((err, docs) => {
        if (err) console.log('DB Find Error', err); // eslint-disable-line no-console
        if (docs && docs.length > 0) {
          return cb(docs);
        }
        return cb(null);
      });
  });
};

export { getUserProfile };