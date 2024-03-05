"use strict";
const { Review } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Review.bulkCreate(
        // options,
        [
          {
            spotId: 1,
            userId: 2,
            review: "I thought the bedroom was fancy, but the bathroom? Let's just say, nothing beats gold on gold, iykyk!",
            stars: 5,
          },
          {
            spotId: 2,
            userId: 3,
            review: "Great place for a tired hunter to rest and prepare for next day's travel. Calm like the forest, but entertaining like the city.",
            stars: 4,
          },
          {
            spotId: 3,
            userId: 4,
            review: "When I tell you, that the room felt sound-proof, I mean it! It was the most peacful sleep I've had in my life.",
            stars: 5,
          },
          {
            spotId: 4,
            userId: 5,
            review: "The bed was so comfy and shaped to my body so well, I was literally sleeping on air.",
            stars: 3,
          },
          {
            spotId: 5,
            userId: 1,
            review: "Wasn't worth my hard earned inheritance.",
            stars: 2,
          },
          {
            spotId: 1,
            userId: 3,
            review: "After a few nights away from home and a grueling quest to find a magic scroll, this place really hit the spot. On a deep level, I even felt my soul rejuvenated",
            stars: 4,
          },
          {
            spotId: 3,
            userId: 1,
            review: "Like I love quiet time alone, but it was way too quiet. I felt, idk, isolated almost. Like a prisoner to my own room.",
            stars: 2,
          },
          {
            spotId: 5,
            userId: 2,
            review: "Outstanding excellence and marvelous opulence. Money well spent, and I will gladly come back. Especially for the royal entertainment ;)",
            stars: 5,
          },
        ],
        { validate: true }
      );
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4] },
      },
      {}
    );
  },
};
