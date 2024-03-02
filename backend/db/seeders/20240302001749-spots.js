"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // Define the table name directly in the bulkInsert call
    // Pass the options object if you're in production and need to specify the schema
    const tableName = "Spots";
    const records = [
      {
					ownerId: 1,
					address: "720 Chalet Lane ",
					city: "Zermatt",
					state: "Village",
					country: "Switzerland",
					lat: 46.02126,
					lng: 7.74912,
					name: "Luxurious Swiss Chalet",
					description: "This chalet includes five deluxe bedroom suites, open-plan living spaces with floor-to-ceiling windows, a private in-house Gourmet Chef, and a carefully curated art collection.",
					price: 48285
				//	createdAt: new Date(),
				//	updatedAt: new Date()
				},
				{
					ownerId: 1,
					address: "123 Country Lane",
					city: "Selby",
					state: "North Yorkshire",
					country: "England",
					lat: 11.11,
					lng: 22.22,
					name: "The Wardrobe",
					description: "It's bigger on the inside",
					price: 50.00
				//	createdAt: new Date(),
				//	updatedAt: new Date()
				},
				{
					ownerId: 2,
					address: "3500 Lighthouse Blvd",
					city: "Lusby",
					state: "Maryland",
					country: "United States of America",
					lat: 38.38622 ,
					lng: -76.38200,
					name: "Cove Point Lighthouse Keeper's House",
					description: "This historic site, listed on the National Register of Historic Places, includes accommodation for up to eight guests in three bedrooms. It's an active lighthouse and keeper’s home located on a seven-acre point of land in Chesapeake Bay. The cottage features a screened-in porch with views of the lighthouse and water, and guests have access to a beach. Modern comforts like a full kitchen, laundry room, Wi-Fi, and TV are included",
					price: 325
				//	createdAt: new Date(),
				//	updatedAt: new Date()
				},
				{
					ownerId: 3,
					address: "123 Where all your dreams come true Lane ",
					city: "Anaheim",
					state: "California",
					country: "United States of America",
					lat: 35.7645358,
					lng: 35.4730327,
					name: "Disney Land",
					description: "It's the entire Disney Land Park. Rent out the whole park",
					price: 350000
					//createdAt: new Date(),
					//updatedAt: new Date() testing the errors
				}
			]
	},


async down(queryInterface, Sequelize) {
  options.tableName = "Spots";
  const Op = Sequelize.Op;
  return queryInterface.bulkDelete(options, {
    name: {
      [Op.in]: [
        "Disney Land",
        "Cove Point Lighthouse Keeper's House",
        "The Wardrobe",
        "Luxurious Swiss Chalet",
      ],
    },
  });
},
};
