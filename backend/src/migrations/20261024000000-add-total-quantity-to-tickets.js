'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('tickets');

    if (!tableInfo.totalQuantity) {
      await queryInterface.addColumn('tickets', 'totalQuantity', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      });
    }

    if (tableInfo.availableQuantity) {
      await queryInterface.sequelize.query(
        'UPDATE tickets SET totalQuantity = COALESCE(totalQuantity, availableQuantity), availableQuantity = COALESCE(availableQuantity, totalQuantity, 0) WHERE 1=1'
      );
    }
  },

  async down(queryInterface) {
    const tableInfo = await queryInterface.describeTable('tickets');

    if (tableInfo.totalQuantity) {
      await queryInterface.removeColumn('tickets', 'totalQuantity');
    }
  }
};
