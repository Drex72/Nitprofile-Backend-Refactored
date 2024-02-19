"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1,
      },
      sku: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "GHB-SKU",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          max: 100,
        },
        defaultValue: "",
      },
      brand_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "category",
          key: "id",
        },
      },
      sub_category_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "sub_category",
          key: "id",
        },
      },
      availability_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "availability",
          key: "id",
        },
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      price_bid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      weight_unit: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tags: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
      },
      status: {
        type: Sequelize.ENUM("AVAILABLE", "UNAVAILABLE"),
        allowNull: false,
        defaultValue: "UNAVAILABLE",
      },
      shared_purchase: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      is_draft: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable("products")
  },
}
