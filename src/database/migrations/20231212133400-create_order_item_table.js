"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order_items", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1,
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "orders", // Assuming you have an 'orders' table
          key: "id", // The column in 'orders' table that 'order_id' refers to
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      variant_id: {
        type: Sequelize.UUID,
        references: {
          model: "variants",
          key: "id",
        },
      },
      brand_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity: {
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
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("order_items")
  },
}
