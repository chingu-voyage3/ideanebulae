'use strict';
module.exports = (sequelize, DataTypes) => {
  var Agreement = sequelize.define('agreement', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    
    idea_id: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'ideas',
        key: 'id',
      },
      allowNull: false,
    },
 
    idea_profile_id: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'profiles',
        key: 'id',
      },
      allowNull: false,
    },

    idea_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    idea_type: {
      type: DataTypes.ENUM,
      values: ['public', 'private', 'commercial'],
      defaultValue: 'public',
      allowNull: false,
    },

    agreement: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    version: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  }, {
      underscored: true,
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          Agreement.belongsTo(models.Profile);
          Agreement.belongsTo(models.Idea);
        }
      }
    });
  return Agreement;
};
