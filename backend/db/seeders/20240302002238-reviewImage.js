"use strict";

const { reviewImage, sequelize } = require("../models");
let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		options.tableName = "reviewImage";
		return queryInterface.bulkInsert(
			options,
			[
				{ url: "image1.url", reviewId: 1 },
				{ url: "image2.url", reviewId: 1 },
				{ url: "image3.url", reviewId: 1 },
				{ url: "image4.url", reviewId: 2 },
				{ url: "image5.url", reviewId: 2 },
				{ url: "image6.url", reviewId: 2 },
				{ url: "image7.url", reviewId: 3 },
				{ url: "image8.url", reviewId: 3 },
				{ url: "image9.url", reviewId: 3 },
				{ url: "image10.url", reviewId: 3 },
				{ url: "image11.url", reviewId: 4 },
				{ url: "image12.url", reviewId: 4 },
				{ url: "image13.url", reviewId: 4 },
				{ url: "image14.url", reviewId: 4 },
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "reviewImage";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options, {
			url: "image.url",
		});
	},
};
