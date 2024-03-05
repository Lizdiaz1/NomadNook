"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Spot, {
        foreignKey: "spotId",
        constraints: false,
      });
      Image.belongsTo(models.Review, {
        foreignKey: "spotId",
        constraints: false,
      });
    }
  }
  Image.init(
    {
      spotId: DataTypes.INTEGER,
      Type: DataTypes.STRING,
      preview: DataTypes.BOOLEAN,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
