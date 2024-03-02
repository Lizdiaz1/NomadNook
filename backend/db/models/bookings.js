'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookings.belongsTo(
        models.User, {
        foreignKey: "userId",
      }
      )
      Bookings.belongsTo(
        models.Spots, {
        foreignKey: 'spotId',
      }
      )
    }
  }
  Bookings.init(
    {
      userId: {
        type: DataTypes.INTEGER,
      },

      spotId: {
        type: DataTypes.INTEGER,
      },
      startDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true
        }
      },
      endDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        }
      },
    },
    {
      sequelize,
      modelName: 'Bookings',
    });
  return Bookings;
};
