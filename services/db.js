import Sequelize from 'sequelize';
import config from './config'
import Profile from '../models/profile';
import Idea from '../models/idea';
import Agreement from '../models/agreement';
import Review from '../models/review';

let sequelize = null;

const connect = () => {
  sequelize = new Sequelize(config.db.dburl, {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     config.db.dbport,
    host:     config.db.dbhost,
    logging:  true,  
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
    Profile.getProfile();
    Idea.getIdea();
    Agreement.getAgreement();
    Review.getReview();
    Profile.defineProfileRelations();
    Idea.defineIdeaRelations();
    Agreement.defineAgreementRelations();
    Review.defineReviewRelations();
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