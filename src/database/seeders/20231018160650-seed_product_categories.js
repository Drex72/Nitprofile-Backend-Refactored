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

    const categories = [
      {
        id: "622c4d4e-3786-4c19-b790-29e4c8c67463",
        name: "Fruits",
        description: "Anything",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "6f5f2c92-b109-48dc-bf72-89bc04664ade",
        name: "Vegetables",
        description: "Anything",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "525d6c4c-4054-41d2-8bd3-e4a10f83f20f",
        name: "Herbs and Spices",
        description: "Anything",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "8be52837-d334-432e-a1fa-07a71b313b0d",
        name: "Root Crops",
        description: "Anything",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "5de2747a-ccdd-451a-b2e2-108f91b5be26",
        name: "Legumes",
        description: "Anything",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "ac75e9d6-568b-4b1c-98d4-e251722e6472",
        name: "Grains",
        description: "Anything",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "dd9a6214-12ab-4f3d-ad08-e4286bba9f97",
        name: "Nuts and Seeds",
        description: "Anything",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cee62fdd-0d3e-4934-9a84-e3adf9c54f57",
        name: "Dairy and Eggs",
        description: "Anything",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "eb7cb57b-cac3-497e-84d3-8e66bc2ba10e",
        name: "Meat and Poultry",
        description: "Anything",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3f7ac964-8c02-4e60-84b3-c0862d8a9858",
        name: "Bakery and Staples",
        description: "Anything",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "f92e02ee-e24d-491b-b803-bb50d7da9f2b",
        name: "Organic and Health Foods",
        description: "Anything",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await queryInterface.bulkInsert("category", categories, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("category")
  },
}
