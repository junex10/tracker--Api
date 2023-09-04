'use strict';

const Constants = require('./../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('medical_appointments', {
      id: Constants.PRIMARY_KEY,
      patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      payment_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'payments',
          key: 'id'
        }
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      medical_reason: {
        type: Sequelize.STRING,
        allowNull: false
      },
      medical_description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date_cite: {
        type: Sequelize.DATE,
        allowNull: false
      },
      entry_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      amount: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: Constants.STATUS,
      ...Constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('medical_appointments');
  }
};
