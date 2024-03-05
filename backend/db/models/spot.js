'use strict';

const { Model } = require('sequelize');

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
        models.booking, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      })

      spot.hasMany(
        models.review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      })

      spot.hasMany(
        models.spotImage, {
        foreignKey: 'spotId',
        as: 'previewImage',
        onDelete: 'CASCADE',
        hooks: true
      })

      spot.belongsTo(
        models.user, {
        foreignKey: 'ownerId',
        as: 'Owner',
      })
    }
  }
  spot.init({
    ownerId: {
      type: DataTypes.INTEGER
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lat: {
      type: DataTypes.DECIMAL(10, 8),
      validate: {
        min: -90, max: 90
      }
    },

    lng: {
      type: DataTypes.DECIMAL(11, 8),
      validate: {
        min: -180, max: 180
      }
    },

     name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          max: 50,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 500],
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isNumeric: true,
        },

  },
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
