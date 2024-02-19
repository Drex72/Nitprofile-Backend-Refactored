"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("notifications", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      item_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      actor: {
        type: Sequelize.UUID,
        allowNull: true,

        references: {
          model: "users",
          key: "id",
        },
      },
      notifier: {
        type: Sequelize.UUID,
        allowNull: false,

        references: {
          model: "users",
          key: "id",
        },
      },
      entity_type_id: {
        type: Sequelize.UUID,
        allowNull: false,

        references: {
          model: "notification_entity",
          key: "id",
        },
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
    await queryInterface.dropTable("notifications")
  },
}
