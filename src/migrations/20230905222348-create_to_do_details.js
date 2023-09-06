'use strict';
const constants = require('../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('to_do_details', {
      id: constants.PRIMARY_KEY,
      to_do_details: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'chats_session',
          key: 'id'
        }
      },
      sender_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      message: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ...Constants.DATES_CONTROL
    });
    return Promise.all([
      queryInterface.addColumn(
        'to_do_details',
        'name',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'to_do_details',
        'description',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'to_do_details',
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
    await queryInterface.dropTable('to_do_details');
  }
};
