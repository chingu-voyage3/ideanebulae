'use strict';
module.exports = (sequelize, DataTypes) => {
  var Idea = sequelize.define('Idea', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    idea_type: {
      type: DataTypes.ENUM,
      values: ['public', 'private', 'commercial'],
      defaultValue: 'public',
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
  }, {
      underscored: true,
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          Idea.belongsTo(models.Profile);
          Idea.hasOne(models.Agreement);
          Idea.hasMany(models.Review);
        }
      }
    });
  return Idea;
};
