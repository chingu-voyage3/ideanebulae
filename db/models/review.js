'use strict';
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    profile_id: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id',
      },
      allowNull: false,
    },

    idea_id: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Ideas',
        key: 'id',
      },
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
