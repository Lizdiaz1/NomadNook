"use strict";
const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(
      // options,
      [
        {
          spotId: 1,
          userId: 1,
          startDate: new Date("2023-10-1"),
          endDate: new Date("2023-10-2"),
        },
        {
          spotId: 1,
          userId: 1,
          startDate: new Date("12-12-2023"),
          endDate: new Date("12-13-2023"),
        },
        {
          spotId: 1,
          userId: 2,
          startDate: new Date("12-20-2023"),
          endDate: new Date("12-24-2023"),
        },
        {
          spotId: 1,
          userId: 3,
          startDate: new Date("12-26-2023"),
          endDate: new Date("12-30-2023"),
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date("11-5-2023"),
          endDate: new Date("11-10-2023"),
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date("01-01-2024"),
          endDate: new Date("01-07-2024"),
        },
        {
          spotId: 2,
          userId: 1,
          startDate: new Date("01-15-2024"),
          endDate: new Date("01-18-2024"),
        },
        {
          spotId: 2,
          userId: 3,
          startDate: new Date("01-22-2024"),
          endDate: new Date("02-02-2024"),
        },
        {
          spotId: 3,
          userId: 3,
          startDate: new Date("11-25-2023"),
          endDate: new Date("11-30-2023"),
        },
        {
          spotId: 3,
          userId: 3,
          startDate: new Date("12-25-2023"),
          endDate: new Date("01-01-2024"),
        },
        {
          spotId: 3,
          userId: 1,
          startDate: new Date("01-25-2024"),
          endDate: new Date("01-26-2024"),
        },
        {
          spotId: 3,
          userId: 2,
          startDate: new Date("02-02-2026"),
          endDate: new Date("03-02-2026"),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Booking";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
