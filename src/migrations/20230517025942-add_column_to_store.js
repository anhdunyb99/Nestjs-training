'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Stores',
        'brozne_discount',
        {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Stores',
        'silver_discount',
        {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Stores',
        'gold_discount',
        {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Stores',
        'minium_money',
        {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Stores',
        'bronze_default_point',
        {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Stores',
        'silver_default_point',
        {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Stores',
        'gold_default_point',
        {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Stores',
        'bronze_max_point',
        {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Stores',
        'silver_max_point',
        {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Stores',
        'gold_max_point',
        {
          type: Sequelize.DOUBLE,
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
