"use strict";

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
      await Booking.bulkCreate([
        {
          spotId: 1,
          userId: 1,
          startDate: new Date("2024-10-01"),
          endDate: new Date("2024-10-02"),
        },
        {
          spotId: 1,
          userId: 1,
          startDate: new Date("2024-12-12"),
          endDate: new Date("2024-12-13"),
        },
        {
          spotId: 1,
          userId: 2,
          startDate: new Date("2024-12-20"),
          endDate: new Date("2024-12-24"),
        },
        {
          spotId: 1,
          userId: 3,
          startDate: new Date("2024-12-26"),
          endDate: new Date("2024-12-30"),
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date("2024-11-05"),
          endDate: new Date("2024-11-10"),
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date("2024-09-01"),
          endDate: new Date("2024-09-07"),
        },
        {
          spotId: 2,
          userId: 1,
          startDate: new Date("2024-10-15"),
          endDate: new Date("2024-11-18"),
        },
        {
          spotId: 2,
          userId: 3,
          startDate: new Date("2024-11-22"),
          endDate: new Date("2024-11-28"), // Corrected end date
        },
        {
          spotId: 3,
          userId: 3,
          startDate: new Date("2024-11-25"),
          endDate: new Date("2024-11-30"),
        },
        {
          spotId: 3,
          userId: 3,
          startDate: new Date("2024-12-25"),
          endDate: new Date("2025-01-01"),
        },
        {
          spotId: 3,
          userId: 1,
          startDate: new Date("2024-01-25"),
          endDate: new Date("2024-01-26"),
        },
        {
          spotId: 3,
          userId: 2,
          startDate: new Date("2026-02-02"),
          endDate: new Date("2026-03-02"),
        },
      ], { validate: true });
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
