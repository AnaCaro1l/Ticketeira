'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('events');

    if (!tableInfo.userId) {
      await queryInterface.addColumn('events', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }

    const userTable = await queryInterface.describeTable('users');
    if (userTable && userTable.id && tableInfo.userId) {
      await queryInterface.addIndex('events', ['userId']);
    }
  },

  async down(queryInterface) {
    const tableInfo = await queryInterface.describeTable('events');

    if (tableInfo.userId) {
      await queryInterface.removeConstraint('events', 'events_userId_foreign_idx');
      await queryInterface.removeColumn('events', 'userId');
    }
  }
};
