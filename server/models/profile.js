import Sequelize from "sequelize";
import { getDbConnection, profileModel } from "../services/db";

export default class Profile {
  constructor() {
    this.model = this.defineModel();
  }

  defineModel() {
    const sequelize = getDbConnection();
    this.model = sequelize.define(
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
    console.log('profile.defineModel: ', this.model);
    return this.model;
  };

  static defineAssociations() {
    this.model.hasMany(Idea);
    this.model.hasMany(Agreement);
    this.model.hasMany(Review);
  };

  static getModel() {
    return this.model;
  };
}

