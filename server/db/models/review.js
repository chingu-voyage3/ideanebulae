'use strict';
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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

    reviewer_id: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'profiles',
        key: 'id',
      },
      allowNull: false,
    },

    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
      underscored: true,
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          Review.belongsTo(models.Profile);
          Review.belongsTo(models.Idea);
        }
      }
    });
  return Review;
};
