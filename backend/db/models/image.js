'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Image extends Model {

      static associate(models) {

        Image.belongsTo(models.Spot, { foreignKey: 'spotId', as: 'spot' });
      }
    };
    Image.init({
      spotId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      preview: DataTypes.BOOLEAN,
      url: DataTypes.STRING(512)
    }, {
      sequelize,
      modelName: 'Image',
      tableName: 'Images',
      
    });
    return Image;
  };
