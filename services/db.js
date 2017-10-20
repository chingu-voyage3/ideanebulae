import config from './mongoose.config';
import mongoose from 'mongoose';

const mongoURI = `mongodb://${config.db.host}/${config.db.name}`;
//const mongoURI = (process.env.NODE_ENV !== 'production') ? 'mongodb://ds011732.mlab.com:11732/ideanebulae' : process.env.MONGODB_URI || 'mongodb://localhost:27017/ideanebulae';

let db = null;

/**
 * @description Close the connection to the MongoDB instance
 */
const closeConnection = () => {
  if (db) {
    db.close();
  }
};

/**
 * @description Open a connection to the MongoDB instance
 * @returns {Object} promise - Promise returned from the Mongoose connect call
 */
const openConnection = () => {
  mongoose.Promise = global.Promise;  
  const promise = mongoose.connect(mongoURI, {
    useMongoClient: true,
  });
  return promise;
};


/**
 * @description Used by the other functions to get a connection to MongoDB.
 * If no connection is established it calls openConnection to create one.
 */
const getConnection = () => {
  if (db) {
    cb(db);
  } else {
    return openConnection(cb);
  }
};

module.exports = {
  closeConnection,
  getConnection,
  openConnection
};