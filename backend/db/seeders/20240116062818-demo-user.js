"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      // options,
      [
        {
          firstName: "Demo",
          lastName: "Lition",
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Alan",
          lastName: "Orbos",
          email: "user1@user.io",
          username: "orBoss-elitE",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Trultimus",
          lastName: "Ironside",
          email: "user2@user.io",
          username: "Totally-trulti",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Liannia",
          lastName: "Feather-Gin",
          email: "user3@user.io",
          username: "Drunk0n-Gin",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          firstName: "Hasuke",
          lastName: "Yamada",
          email: "user4@user.io",
          username: "luvYam$91",
          hashedPassword: bcrypt.hashSync("password5"),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "orBoss-elitE", "Totally-trulti", "Drunk0n-Gin"] },
      },
      {}
    );
  },
};
