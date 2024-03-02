"use strict";

const { booking } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
    options.tableName = "booking";
		return queryInterface.bulkInsert(options,
			[
				{
					userId: 1,
					spotId: 1,
					startDate: new Date("2024-12-24").toJSON(),
					endDate: new Date("2024-12-25").toJSON(),
				},
				{
					userId: 1,
					spotId: 2,
					startDate: new Date("2024-12-26").toJSON(),
					endDate: new Date("2024-12-27").toJSON(),
				},
				{
					userId: 2,
					spotId: 3,
					startDate: new Date("2024-12-28").toJSON(),
					endDate: new Date("2024-12-29").toJSON(),
				},
				{
					userId: 3,
					spotId: 4,
					startDate: new Date("2024-12-30").toJSON(),
					endDate: new Date("2024-12-31").toJSON(),
				}, ], { validate: true });
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "booking";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options, {
			spotId: { [Op.in]: [1, 2, 3, 4] },
		}, {});
	  }
	};
