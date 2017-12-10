import Sequelize from 'sequelize';
import db from '../services/db';

const sequelize = db.get();

const User = sequelize.define('user', {
  user_id: {
    type: Sequelize.STRING
  },

  // User name used for authentication (Auth0 nickname field)
  username: {
    type: Sequelize.STRING    
  },

  // User full name (Auth0 name field)
  name: {
    type: Sequelize.STRING    
  },

  // User's social media avatar (Auth0 picture field)
  avatar_url: {
    type: Sequelize.STRING
  },

  // User's qualification description 
  qualifications: {
    type: Sequelize.STRING
  },
});

export default User;
