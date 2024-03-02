"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bookings extends Model {
    static associate(models) {
      bookings.belongsTo(models.Spot, {
        foreignKey: "spotId",
      });
      bookings.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  bookings.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      spotId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      startDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      endDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
    },
    {
      sequelize,
      modelName: "bookings",
    }
  );
  return bookings;
};
