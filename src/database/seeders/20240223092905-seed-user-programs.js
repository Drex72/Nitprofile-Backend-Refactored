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

        await queryInterface.bulkInsert(
            "user_programs",
            [
                {
                    id: "ba060990-fba5-4a24-afde-f06807d20991",
                    userId: "622c4d4e-3786-4c19-b790-29e4c8c67463",
                    programId: "b6834400-d1f6-11ee-a164-ad0737a3791c",
                    profileImageUrl: null,
                    profileGenerationDate: null,
                    completedTraining: false,
                    certificateImageUrl: null,
                    certificateGenerationDate: null,
                    acceptanceMailSent: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("user_programs", null)
    },
}
