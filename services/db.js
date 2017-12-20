import Sequelize from 'sequelize';
import config from './config'
import { getProfile } from '../models/profile';
import Idea from '../models/idea';
import Agreement from '../models/agreement';
import Review from '../models/review';

let sequelize = null;

/**
 * @description Create a new connection to the Postgres database and
 * instantiate all Sequelize models and associations.
 * @return {Object} sequelize - The Sequelize connection
 */
export function connect() {
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
    const profileModel = getProfile();
    console.log('In db.connect - profileModel: ', profileModel);
    /*
    Idea.getIdea();
    Agreement.getAgreement();
    Review.getReview();
    Profile.defineAssociations();
    Idea.defineIdeaRelations();
    Agreement.defineAgreementRelations();
    Review.defineReviewRelations();
    */
    console.log('Connection has been established successfully.');
    return sequelize;
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  return sequelize;
};

/**
 * @description Used by the other functions to get a connection to Sequelize.
 * @returns {Object} sequelize - The current Sequelize connection or creates a
 * new connection if one hasn't yet been established.
 */
export function getDbConnection() {
  if (!sequelize) {
    connect();
  }
  return sequelize;
};

module.exports = { get };
