'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      order_txn_reference: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      order_status: {
        type: Sequelize.ENUM('PENDING', 'CANCELLED', 'CONFIRMED','ACCEPTED', 'COMPLETED'),
        allowNull: false,
        defaultValue: 'PENDING', 
      },
      order_total_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  },
};
