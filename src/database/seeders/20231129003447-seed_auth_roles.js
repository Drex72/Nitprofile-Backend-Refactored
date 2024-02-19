"use strict"
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

    const categories = [
      {
        id: "6be3dfaf-256f-4a3e-885a-d956ba80fa8e",
        name: "Farmer",
        description: "Anything",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "f999e2f3-0057-4909-9744-e125171a1d09",
        name: "Consumer",
        description: "Shayo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await queryInterface.bulkInsert("roles", categories, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("roles")
  },
}
