"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    static associate(models) {
      booking.belongsTo(models.spot, {
        foreignKey: "spotId",
      });
      booking.belongsTo(models.user, {
        foreignKey: "userId",
      });
    }
  }
  booking.init(
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
      modelName: "booking",
    }
  );
  return booking;
};
