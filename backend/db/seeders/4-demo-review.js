"use strict";

const { Review } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;}


module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Review.bulkCreate(
        // options,
        [
          {
            spotId: 1,
            userId: 2,
            review: "this place is great :)",
            stars: 5,
          },
          {
            spotId: 2,
            userId: 3,
            review: 	"Price is outrageous. They say one thing on the website but there are hidden fees. The invoice included my entire mortal soul! SCAM STAY AWAY",
            stars: 4,
          },
          {
            spotId: 3,
            userId: 4,
            review: "Beautiful view!:)",
            stars: 5,
          },
          {
            spotId: 4,
            userId: 5,
            review:  "Only the true ballers could afford something like this. Ball is life. Only place with rats bigger than the ones in NY ",
            stars: 3,
          },
          {
            spotId: 2,
            userId: 1,
            review: "Wasn't worth it.",
            stars: 2,
          },
          {
            spotId: 1,
            userId: 3,
            review: "After a few nights away from home I felt rejuvenated",
            stars: 4,
          },
          {
            spotId: 3,
            userId: 1,
            review: "Like I love quiet time alone, but it was way too quiet.",
            stars: 2,
          },
          {
            spotId: 4,
            userId: 2,
            review: "Money well spent;)",
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





// module.exports = {
//   async up() {
//     const reviews = [
//       {
//         spotId: 1,
//         userId: 2,
//         review: "this place is great :)",
//         stars: 5,
//       },
//       {
//         spotId: 2,
//         userId: 3,
//         review: 	"Price is outrageous. They say one thing on the website but there are hidden fees. The invoice included my entire mortal soul! SCAM STAY AWAY",
//         stars: 4,
//       },
//       {
//         spotId: 3,
//         userId: 4,
//         review: "Beautiful view!:)",
//         stars: 5,
//       },
//       {
//         spotId: 4,
//         userId: 5,
//         review:  "Only the true ballers could afford something like this. Ball is life. Only place with rats bigger than the ones in NY ",
//         stars: 3,
//       },
//       {
//         spotId: 2,
//         userId: 1,
//         review: "Wasn't worth it.",
//         stars: 2,
//       },
//       {
//         spotId: 1,
//         userId: 3,
//         review: "After a few nights away from home I felt rejuvenated",
//         stars: 4,
//       },
//       {
//         spotId: 3,
//         userId: 1,
//         review: "Like I love quiet time alone, but it was way too quiet.",
//         stars: 2,
//       },
//       {
//         spotId: 4,
//         userId: 2,
//         review: "Money well spent;)",
//         stars: 5,
//       },
//     ];

//     try {
//       await Review.bulkCreate(reviews, { validate: true });
//     } catch (error) {
//       console.error('Error seeding Reviews:', error);
//     }
//   },


// async down() {
//   try {

//     await Review.destroy({
//       where: {
//         [Sequelize.Op.or]: [
//           { spotId: { [Sequelize.Op.in]: [1, 2, 3, 4] } }, // Adjust these IDs as necessary
//           { userId: { [Sequelize.Op.in]: [1, 2, 3, 4] } }  // Adjust these IDs as necessary
//         ]
//       }
//     });
//   } catch (error) {
//     console.error('Error reverting Reviews seed:', error);
//   }
// },
// };
