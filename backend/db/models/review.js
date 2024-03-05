"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: "userId" });
      Review.belongsTo(models.Spot, { foreignKey: "spotId" });
      Review.hasMany(models.Image, {
        foreignKey: "imageableId", onDelete: 'CASCADE',  hooks: true,
        constraints: false,
        scope: {
          imageableType: "Review",
        },
      });
    }
  }
  Review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      spotId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      review: {
        type: DataTypes.STRING,
        validate: {
          len: [10, 10000],
        },
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [1, 5]
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
