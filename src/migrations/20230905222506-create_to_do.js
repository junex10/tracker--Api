'use strict';
const constants = require('../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'to_do',
        'name',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'to_do',
        'attachment',
        {
          type: Sequelize.TEXT,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'to_do',
        'marked',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          default: false
        }
      ),
      ...constants.DATES_CONTROL
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('to_do');
  }
};