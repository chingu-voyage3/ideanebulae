import Sequelize from "sequelize";
import db from "../services/db";
import profileMethods from "./methods/profileMethods";
import Idea from "./idea";
import Agreement from "./agreement";
import Review from "./review";

let Profile = null;

const getProfile = () => {
  Profile = db.get().define(
    "profile",
    {
      user_id: {
        type: Sequelize.STRING,
        primaryKey: true
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
      }
    },
    {
      // By default, sequelize automatically pluralizes table names unless
      // this option is enabled.
      freezeTableName: true,
      // By default, sequelize generates columns such as 'createdAt' and
      // 'modifiedAt' which are automatically timestamped unless this
      // option is disabled.
      timestamps: false,
      // The default casing is camelCase however if the source model is
      // configured with underscored: true the foreignKey will be snake_case.
      underscored: true
    }
  );
};

const defineProfileRelations = () => {
  db.get().hasMany(Idea);
  db.get().hasMany(Agreement);
  db.get().hasMany(Review);
};

export { Profile, getProfile, defineProfileRelations };