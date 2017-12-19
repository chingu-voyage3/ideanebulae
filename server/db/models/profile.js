'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    user_id: {
      DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },

    username: {
      DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    name: DataTypes.STRING,

    avatar_url: DataTypes.STRING,

    qualifications: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Profile;
};
