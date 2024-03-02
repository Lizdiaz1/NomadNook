"use strict";

const { Review, sequelize } = require("../models");
let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}


module.exports = {
	async up(queryInterface, Sequelize) {
		options.tableName = "review";
		return queryInterface.bulkInsert(
			options,
			[
				{
					userId: 4,
					spotId: 1,
					review: "this place is great :)",
					stars: 4,
				},
				{
					userId: 2,
					spotId: 1,
					review: "this place is ok",
					stars: 3,
				},
				{
					userId: 3,
					spotId: 1,
					review: "this place is good",
					stars: 3,
				},
				{
					userId: 3,
					spotId: 2,
					review:
						"Beautiful view!:)",
					stars: 5,
				},
				{
					userId: 1,
					spotId: 2,
					review:
						"Price is outrageous. They say one thing on the website but there are hidden fees. The invoice included my entire mortal soul! SCAM STAY AWAY",
					stars: 1,
				},
				{
					userId: 4,
					spotId: 4,
					review:
						"Only the true ballers could afford something like this. Ball is life. Only place with rats bigger than the ones in NY ",
					stars: 5,
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "review";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				spotId: 1,
			},
			{}
		);
	},
};
