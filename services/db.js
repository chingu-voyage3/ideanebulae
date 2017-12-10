import Sequelize from 'sequelize';
import config from './config';

let sequelize = null;

const connect = () => {
  sequelize = new Sequelize(config.db.dbname, config.db.dbuserid, config.db.dbpasswd, {
    host: 'localhost',
    dialect: 'postgres',
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });
  
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
  return sequelize;
};

// Used by the other functions to get a connection to Sequelize.
// Connects, if no connection is established yet.
const get = () => {
  if (sequelize) {
    return sequelize;
  } else {
    return connect();
  }
};

module.exports = { get };