"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.bulkInsert('Users', [
//         {
//           firstName: "Demo",
//           lastName: "Lition",
//           email: "demo@user.io",
//           username: "Demo-lition",
//           hashedPassword: bcrypt.hashSync("password"),
//         },
//         {
//           firstName: "Micheal",
//           lastName: "Morbus",
//           email: "user1@user.io",
//           username: "VampMan3",
//           hashedPassword: bcrypt.hashSync("password2"),
//         },
//         {
//           firstName: "Bruce",
//           lastName: "Wayne",
//           email: "user2@user.io",
//           username: "DABatman",
//           hashedPassword: bcrypt.hashSync("password3"),
//         },
//         {
//           firstName: "Lia",
//           lastName: "Gin",
//           email: "user3@user.io",
//           username: "L1A-Gin",
//           hashedPassword: bcrypt.hashSync("password4"),
//         },
//         {
//           firstName: "Henry",
//           lastName: "Yamada",
//           email: "user4@user.io",
//           username: "HenYam$78",
//           hashedPassword: bcrypt.hashSync("password5"),
//         },
//       ],
//       { validate: true }
//     );
//   },

//   async down(queryInterface, Sequelize) {
//     options.tableName = "Users";
//     const Op = Sequelize.Op;
//     return queryInterface.bulkDelete(
//       options,
//       {
//         username: { [Op.in]: ["Demo-lition", "VampMan3", "DABatman", "L1A-Gin"] },
//       },
//       {}
//     );
//   },
// };


module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await User.bulkCreate([
        {
          firstName: "Demo",
          lastName: "Lition",
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Micheal",
          lastName: "Morbus",
          email: "user1@user.io",
          username: "VampMan3",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Bruce",
          lastName: "Wayne",
          email: "user2@user.io",
          username: "DABatman",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Lia",
          lastName: "Gin",
          email: "user3@user.io",
          username: "L1A-Gin",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          firstName: "Henry",
          lastName: "Yamada",
          email: "user4@user.io",
          username: "HenYam$78",
          hashedPassword: bcrypt.hashSync("password5"),
        },
      ], { validate: true });
    } catch (error) {
      console.error("Error seeding Users:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("Users", {
        username: { [Sequelize.Op.in]: ["Demo-lition", "VampMan3", "DABatman", "L1A-Gin", "HenYam$78"] },
      }, {});
    } catch (error) {
      console.error("Error reverting Users seed:", error);
    }
  }
};
