import mongo from 'mongodb';

const mongoURI = 'mongodb://ds011732.mlab.com:11732/ideanebulae'
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
 * @param {function} cb - Callback function to be invoked once the connection has been established
 */
const openConnection = (cb) => {
  mongo.connect(mongoURI, (err, _db) => {
    // TODO: Add proper error handling
    if (err) {
      console.log('DB Connection Error', err);
    } else {
      db = _db;
      cb(db);
    }
  });
};

// Used by the other functions to get a connection to MongoDB.
// Connects, if no connection is established yet.
/**
 * @description 
 * @param {function} cb - Callback function to be invoked once the connection has been established
 */
const getConnection = (cb) => {
  if (db) {
    cb(db);
  } else {
    openConnection(cb);
  }
};

module.exports = {
  closeConnection,
  getConnection
};