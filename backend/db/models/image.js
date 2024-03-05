"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Spot, {
        foreignKey: "imageableId",
        constraints: false,
      });
      Image.belongsTo(models.Review, {
        foreignKey: "imageableId",
        constraints: false,
      });
    }
  }
  Image.init(
    {
      imageableId: DataTypes.INTEGER,
      imageableType: DataTypes.STRING,
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
