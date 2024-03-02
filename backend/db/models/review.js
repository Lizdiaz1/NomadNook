'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      review.hasMany(
        models.reviewImage, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
        hooks: true
      }
      )

      review.belongsTo(
        models.user, {
        foreignKey: 'userId',
      }
      )
      review.belongsTo(
        models.spot, {
        foreignKey: 'spotId',
      }
      )
    }
  }
  review.init({
    userId: {
      type: DataTypes.INTEGER
    },
    spotId: {
      type: DataTypes.INTEGER
    },
    review: {
      type: DataTypes.STRING,
      validate: {
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};
