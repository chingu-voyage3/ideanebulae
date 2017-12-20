'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('documents', {
      idea_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'ideas',
          key: 'id',
        },
        allowNull: false,
      },
      idea_profile_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'profiles',
          key: 'id',
        },
        allowNull: false,
      },
      idea_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idea_type: {
        type: Sequelize.ENUM,
        values: ['public', 'private', 'commercial'],
        defaultValue: 'public',
        allowNull: false,
      },
      url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('documents');
  }
};
