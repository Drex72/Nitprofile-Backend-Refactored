"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reviews", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      product_id: {
        type: Sequelize.UUID,
        references: {
          model: "products",
          key: "id",
        },
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      comment: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("reviews")
  },
}
