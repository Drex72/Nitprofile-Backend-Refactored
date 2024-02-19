"use strict"
const { v4: uuidv4 } = require("uuid")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const availability = [
      {
        name: "Now",
        id: uuidv4(),
        createdAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "2 weeks",
        id: uuidv4(),
        createdAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "4 weeks",
        id: uuidv4(),
        createdAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "1 month",
        id: uuidv4(),
        createdAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "2 months",
        id: uuidv4(),
        createdAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "3 months",
        id: uuidv4(),
        createdAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "4 months",
        id: uuidv4(),
        createdAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "6 months",
        id: uuidv4(),
        createdAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "1 year",
        id: uuidv4(),
        createdAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await queryInterface.bulkInsert("availability", availability, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("availability")
  },
}
