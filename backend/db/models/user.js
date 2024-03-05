'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // One-to-many relationship: A user has many spots
      user.hasMany(models.Spot, {
        foreignKey: "ownerId",
        onDelete: "CASCADE", // Cascade deletes all data
      });

      // One-to-many relationship: A user has many reviews
      user.hasMany(models.Review, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });

      // One-to-many relationship: A user has many bookings
      user.hasMany(models.Booking, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  user.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Username cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        },
      },
    },
    {
      sequelize,
      modelName: "user",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
    }
  );
  return user;
};
