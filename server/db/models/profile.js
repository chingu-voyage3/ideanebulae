'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    name: DataTypes.STRING,

    avatar_url: DataTypes.STRING,

    qualifications: DataTypes.STRING
  }, {
      underscored: true,
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          Profile.hasMany(models.Idea);
          Profile.hasMany(models.Agreement);
        }
      }
    });
  return Profile;
};
