'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('queries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      patientsName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      descripition: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      optionPayment: {
        allowNull: false,
        type: Sequelize.STRING
      },
      methodPayment: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('queries');
  }
};