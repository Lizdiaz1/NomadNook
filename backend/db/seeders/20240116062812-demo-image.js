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
          imageableId: 1,
          imageableType: 'Spot',
          preview: true,
          url: "https://i.pinimg.com/564x/d5/4d/5e/d54d5e6bf5beca90f058d1a512fa27df.jpg"
        },
        {
          imageableId: 2,
          imageableType: 'Spot',
          preview: true,
          url: 'https://media-cdn.tripadvisor.com/media/photo-s/11/84/36/46/desert-tent.jpg'
        },
        {
          imageableId: 3,
          imageableType: 'Spot',
          preview: true,
          url: "https://na.rdcpix.com/1821951854/b57cb3fe060b4e365f4756e99b2b4287w-c249155rd-w832_h468_r4_q80.jpg"
        },
        {
          imageableId: 4,
          imageableType: 'Spot',
          preview: true,
          url: "https://eb2pgoq5kpf.exactdn.com/wp-content/uploads/2015/04/HoneyWereHomeMasterBedroom.134.jpg?strip=all&lossy=1&ssl=1"
        },
        {
          imageableId: 5,
          imageableType: 'Spot',
          preview: true,
          url: "https://png.pngtree.com/thumb_back/fw800/background/20230722/pngtree-opulent-purple-bedroom-featuring-lavish-furnishings-ornate-golden-patterns-a-spacious-image_3784783.jpg"
        },
        {
          imageableId: 1,
          imageableType: 'Review',
          preview: true,
          url: "https://media.tenor.com/MFE6UiMEpRoAAAAC/math-zack-galifianakis.gif"
        },
        {
          imageableId: 2,
          imageableType: 'Review',
          preview: true,
          url: "https://media.tenor.com/MFE6UiMEpRoAAAAC/math-zack-galifianakis.gif"
        },
        {
          imageableId: 3,
          imageableType: 'Review',
          preview: true,
          url: "https://media.tenor.com/MFE6UiMEpRoAAAAC/math-zack-galifianakis.gif"
        },
        {
          imageableId: 4,
          imageableType: 'Review',
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
        imageableId: { [Op.in]: [1, 2, 3, 4] },
      },
      {}
    );
  },
};
