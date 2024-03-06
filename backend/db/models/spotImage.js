"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    static associate(models) {
      SpotImage.belongsTo(models.Spot, {
        foreignKey: "spotId",
        constraints: false,
      });
      SpotImage.belongsTo(models.Review, {
        foreignKey: "spotId",
        constraints: false,
      });
    }
  }
  SpotImage.init(
    {
      spotId: DataTypes.INTEGER,
      Type: DataTypes.STRING,
      preview: DataTypes.BOOLEAN,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SpotImage",
    }
  );
  return SpotImage;
};
