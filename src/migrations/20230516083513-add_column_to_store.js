'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Stores',
        'otp',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Stores',
        'isVerify',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue : false
        },
      ),
      queryInterface.addColumn(
        'Stores',
        'otp_exprise',
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
      ),
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
