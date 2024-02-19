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

    const subcategoriesData = []

    // Define subcategories data
    const subcategories = [
      {
        category: "622c4d4e-3786-4c19-b790-29e4c8c67463",
        items: [
          "Apples",
          "Bananas",
          "Oranges",
          "Grapes",
          "Mangoes",
          "Pineapples",
          "Berries (strawberries, blueberries, raspberries)",
          "Watermelons",
          "Papayas",
        ],
      },
      {
        category: "6f5f2c92-b109-48dc-bf72-89bc04664ade",
        items: [
          "Leafy greens (spinach, lettuce, kale)",
          "Tomatoes",
          "Peppers (bell peppers, chili peppers)",
          "Carrots",
          "Broccoli",
          "Cauliflower",
          "Cucumbers",
          "Onions",
        ],
      },
      {
        category: "525d6c4c-4054-41d2-8bd3-e4a10f83f20f",
        items: [
          "Basil",
          "Parsley",
          "Mint",
          "Rosemary",
          "Thyme",
          "Cilantro",
          "Oregano",
          "Salt",
          "Pepper",
          "Olive oil",
          "Spices (cumin, turmeric, cinnamon)",
        ],
      },
      {
        category: "8be52837-d334-432e-a1fa-07a71b313b0d",
        items: ["Potatoes", "Sweet potatoes", "Cassava", "Yams"],
      },
      {
        category: "5de2747a-ccdd-451a-b2e2-108f91b5be26",
        items: [
          "Beans (black beans, kidney beans, pinto beans)",
          "Lentils",
          "Chickpeas",
          "Peas",
        ],
      },
      {
        category: "ac75e9d6-568b-4b1c-98d4-e251722e6472",
        items: ["Rice", "Millet", "Quinoa", "Oats"],
      },
      {
        category: "dd9a6214-12ab-4f3d-ad08-e4286bba9f97",
        items: [
          "Almonds",
          "Cashews",
          "Peanuts",
          "Sunflower seeds",
          "Pumpkin seeds",
        ],
      },
      {
        category: "cee62fdd-0d3e-4934-9a84-e3adf9c54f57",
        items: ["Eggs", "Cheese (wara)"],
      },
      {
        category: "eb7cb57b-cac3-497e-84d3-8e66bc2ba10e",
        items: [
          "Chicken",
          "Beef",
          "Pork",
          "Fish (salmon, tilapia, catfish)",
          "snail",
        ],
      },
      {
        category: "3f7ac964-8c02-4e60-84b3-c0862d8a9858",
        items: ["Bread", "Flour", "Pasta", "Rice"],
      },
      {
        category: "f92e02ee-e24d-491b-b803-bb50d7da9f2b",
        items: ["Organic produce", "Health-focused products"],
      },
    ]

    // Generate subcategories data
    subcategories.forEach((subcategory) => {
      subcategory.items.forEach((itemName) => {
        subcategoriesData.push({
          id: uuidv4(),
          name: itemName,
          category_id: subcategory.category,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      })
    })

    await queryInterface.bulkInsert("sub_category", subcategoriesData, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("sub_category")
  },
}
