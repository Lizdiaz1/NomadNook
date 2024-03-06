"use strict";
const { Image } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Image.bulkCreate(
      // options,
      [
        {
          spotId: 1,
          Type: 'Spot',
          preview: true,
          url: "https://tjbprivatetravel.com/wp-content/uploads/2022/05/chalet-evening-lit-up-looking-towards-tasch-1-scaled.jpg",
        },
        {
          spotId: 1,
          Type: 'Spot',
          preview: false,
          url: "https://ariajourneys.com/wp-content/uploads/2017/01/luxury_ski_holidays_Zermatt_120.jpg",
        },
        {
          spotId: 1,
          Type: 'Spot',
          preview: false,
        url: "https://www.chaletzermattpeak.com/media/45257/1-welcome-drinks-winter.jpg",
        },
        {
          spotId: 1,
          Type: 'Spot',
          preview: false,
          url: "https://i.insider.com/4eb822ed6bb3f76e0300000a?width=750&format=jpeg&auto=webp",
        },
        {
          spotId: 2,
          Type: 'Spot',
          preview: true,
          url: "https://static.wikia.nocookie.net/narnia/images/6/6e/Wardrobe.jpg",
        },
        {
          spotId: 3,
          Type: 'Spot',
          preview: true,
          url: "https://a0.muscache.com/im/pictures/9f6f2463-2b25-492c-b9aa-f2ee4a508c6a.jpg?im_w=720",
        },
        {
          spotId: 4,
          Type: 'Spot',
          preview: true,
          url: "https://ktla.com/wp-content/uploads/sites/4/2023/01/Disney-100-castle.jpg?strip=1",
        },
        // {
        //   spotId: ,
        //   Type: 'Spot',
        //   preview: true,
        //   url:
        // },
        {
          spotId: 1,
          Type: 'Review',
          preview: true,
          url: "https://i.insider.com/4eb822ed6bb3f76e0300000a?width=750&format=jpeg&auto=webp",
        },
        {
          spotId: 2,
          Type: 'Review',
          preview: true,
          url: "https://www.narniaweb.com/wp-content/uploads/2020/11/pevensies-return-screenshot-1024x576.jpg",
        },
        {
          spotId: 3,
          Type: 'Review',
          preview: true,
          url: "https://i.pinimg.com/originals/9a/fb/12/9afb12c20cf4cb2ccf6a01ef9aec2fec.jpg",
        },
        {
          spotId: 4,
          Type: 'Review',
          preview: true,
          url: "https://pbs.twimg.com/media/E2LgbsUWYAs7Byo.jpg",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Images";
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
