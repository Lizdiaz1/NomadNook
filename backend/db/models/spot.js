'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      spot.hasMany(
        models.Bookings, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      }
      )

      spot.hasMany(
        models.Reviews, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      }
      )

      spot.hasMany(
        models.SpotImages, {
        foreignKey: 'spotId',
        as: 'previewImage',
        onDelete: 'CASCADE',
        hooks: true
      }
      )

      spot.belongsTo(
        models.User, {
        foreignKey: 'ownerId',
        as: 'Owner',
      }
      )
    }
  }
  spot.init({
    ownerId: {
      type: DataTypes.INTEGER
    },

    address: {
      type: DataTypes.STRING,

    },

    city: {
      type: DataTypes.STRING,

    },

    state: {
      type: DataTypes.STRING,

    },

    country: {
      type: DataTypes.STRING,

    },

    lat: {
      type: DataTypes.DECIMAL,
      validate: {
        min: -90,
        max: 90
      }
    },

    lng: {
      type: DataTypes.DECIMAL,
      validate: {
        min: -180,
        max: 180
      }
    },

    name: {
      type: DataTypes.STRING,
    },

    description: {
      type: DataTypes.STRING,

    },

    price: {
      type: DataTypes.INTEGER,

    }

  },
    {
      sequelize,
      modelName: 'spot',
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      }

    }
  );
  return spot;
};
