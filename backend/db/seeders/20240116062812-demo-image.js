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
          url: "https://i.pinimg.com/564x/d5/4d/5e/d54d5e6bf5beca90f058d1a512fa27df.jpg"
        },
        {
          spotId: 2,
          Type: 'Spot',
          preview: true,
          url: 'https://media-cdn.tripadvisor.com/media/photo-s/11/84/36/46/desert-tent.jpg'
        },
        {
          spotId: 3,
          Type: 'Spot',
          preview: true,
          url: "https://na.rdcpix.com/1821951854/b57cb3fe060b4e365f4756e99b2b4287w-c249155rd-w832_h468_r4_q80.jpg"
        },
        {
          spotId: 4,
          Type: 'Spot',
          preview: true,
          url: "https://eb2pgoq5kpf.exactdn.com/wp-content/uploads/2015/04/HoneyWereHomeMasterBedroom.134.jpg?strip=all&lossy=1&ssl=1"
        },
        {
          spotId: 5,
          Type: 'Spot',
          preview: true,
          url: "https://png.pngtree.com/thumb_back/fw800/background/20230722/pngtree-opulent-purple-bedroom-featuring-lavish-furnishings-ornate-golden-patterns-a-spacious-image_3784783.jpg"
        },
        {
          spotId: 1,
          Type: 'Review',
          preview: true,
          url: "https://media.tenor.com/MFE6UiMEpRoAAAAC/math-zack-galifianakis.gif"
        },
        {
          spotId: 2,
          Type: 'Review',
          preview: true,
          url: "https://media.tenor.com/MFE6UiMEpRoAAAAC/math-zack-galifianakis.gif"
        },
        {
          spotId: 3,
          Type: 'Review',
          preview: true,
          url: "https://media.tenor.com/MFE6UiMEpRoAAAAC/math-zack-galifianakis.gif"
        },
        {
          spotId: 4,
          Type: 'Review',
          preview: true,
          url: "https://media.tenor.com/MFE6UiMEpRoAAAAC/math-zack-galifianakis.gif"
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
