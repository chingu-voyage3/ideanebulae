'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('agreements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
      agreement: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      version: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
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
    return queryInterface.dropTable('agreements');
  }
};
