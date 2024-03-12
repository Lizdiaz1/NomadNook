'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Image extends Model {

      static associate(models) {

        Image.belongsTo(models.Spot, { foreignKey: 'spotId', as: 'spot' });
      }
    };
    Image.init({
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        spotId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Spot',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false
        },
        preview: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        url: {
          type: DataTypes.STRING(512),
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      }, {
        sequelize,
        modelName: 'Image',
        tableName: 'Images'
      });

      return Image;
    };
