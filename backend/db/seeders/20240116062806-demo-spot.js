"use strict";
const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Spot.bulkCreate(
        // options,
        [
          {
            ownerId: 1,
            address: "17 DuPointe Drive",
            city: "Asteria",
            state: "TX",
            country: "United States",
            lat: Math.random() * 1000,
            lng: Math.random() * -1000,
            name: "Golden Aura Restpoint",
            description: "For those wishing to rest their heads on luxury, come to our bed and breakfast.",
            price: Math.round(Math.random() * 4500),
          },
          {
            ownerId: 2,
            address: "241 East Wingdham Ln",
            city: "Dragnholm",
            state: "CT",
            country: "United States",
            lat: Math.random() * 1000,
            lng: Math.random() * -1000,
            name: "Revensake's BnB",
            description:
            "Seasoned warriors, travelers, and tourists alike are welcomed at Revensake's.",
            price: Math.round(Math.random() * 5000),
          },
          {
            ownerId: 3,
            address: "77 Treblin Circle",
            city: "Terad-Din",
            state: "OK",
            country: "United States",
            lat: Math.random() * 1000,
            lng: Math.random() * -1000,
            name: "Fortified Reprieve",
            description: "Need a quiet place to rest? Look no further! Come stay with us.",
            price: Math.round(Math.random() * 3500),
          },
          {
            ownerId: 4,
            address: "100 Butterdry Place",
            city: "Serasaccia",
            state: "CA",
            country: "United States",
            lat: Math.random() * 1000,
            lng: Math.random() * -1000,
            name: "Nimbus Wake Stay-in",
            description:
            "Enjoy your nights with us and feel like your sleeping on a cloud.",
            price: Math.round(Math.random() * 7000),
          },
          {
            ownerId: 5,
            address: "999 South Ivy Road",
            city: "Farlon Keep",
            state: "FL",
            country: "United States",
            lat: Math.random() * 1000,
            lng: Math.random() * -1000,
            name: "Royal Stop N' Rest",
            description:
            "Only the best of the best for those with a large purse. Amazing luxurious accomodations for all high status individuals. Don't think twice, plan your stay with us, TODAY!",
            price: Math.round(Math.random() * 10000),
          },
        ],
        { validate: true }
      );
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: [
            "Fake-Spot",
            "Unknown-Joint",
            "Hot-Fake-Spot",
            "Some Void Place",
          ],
        },
      },
      {}
    );
  },
};
