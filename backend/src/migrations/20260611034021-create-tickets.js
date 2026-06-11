'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tickets', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'events', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Se o evento for apagado, os ingressos dele também são
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Começa nulo, pois o ingresso é criado antes de ser vendido
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // Se o usuário for apagado, o ingresso volta a ficar sem dono
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'available' // Pode ser: 'available', 'sold', 'cancelled'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tickets');
  }
};