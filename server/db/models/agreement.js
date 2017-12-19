'use strict';
module.exports = (sequelize, DataTypes) => {
  var Agreement = sequelize.define('Agreement', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    agreement_type: {
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
          Agreement.belongsTo(models.Profile);
          Agreement.belongsTo(models.Idea);
        }
      }
    });
  return Agreement;
};
