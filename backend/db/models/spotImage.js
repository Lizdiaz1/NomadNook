'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class spotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      spotImage.belongsTo(
        models.spot, {
        foreignKey: 'spotId',
      }
      )
    }
  }
  spotImage.init({
    spotId: {
      type: DataTypes.INTEGER
    },
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    preview: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'spotImage',
  });
  return spotImage;
};
