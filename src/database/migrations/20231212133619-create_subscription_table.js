"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("subscription_plan", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      frequency: {
        type: Sequelize.ENUM("MONTHLY", "WEEKLY", "YEARLY"), // Replace with actual enum values
        allowNull: false,
      },
      subscription_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("subscription_plan")
  },
}
