'use strict';
const Constants = require('../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('to_do', {
      id: Constants.PRIMARY_KEY,
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      attachment: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      marked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true
      },
      ...Constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('to_do');
  }
};
