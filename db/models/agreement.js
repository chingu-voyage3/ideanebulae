'use strict';
module.exports = (sequelize, DataTypes) => {
  var Agreement = sequelize.define('Agreement', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    agreement_type: DataTypes.ENUM,
    agreement: DataTypes.STRING,
    version: DataTypes.INTEGER,
    profile_id: DataTypes.INTEGER,
    idea_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Agreement;
};