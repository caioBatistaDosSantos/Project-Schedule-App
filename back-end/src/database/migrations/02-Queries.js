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
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      methodPayment: {
        allowNull: false,
        type: Sequelize.STRING
      },
      statusPayment: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('queries');
  }
};