'use strict';
module.exports = (sequelize, DataTypes) => {
  var Document = sequelize.define('Document', {
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

    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

  }, {
      underscored: true,
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          Document.belongsTo(models.Profile);
          Document.belongsTo(models.Idea);
        }
      }
    });
  return Document;
};
