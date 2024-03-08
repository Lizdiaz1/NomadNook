"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Spots",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        ownerId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users', 
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL', // or 'CASCADE' depending on your requirements
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        state: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        country: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lat: {
          type: Sequelize.FLOAT,
          // unique: true,
        },
        lng: {
          type: Sequelize.FLOAT,
          // unique: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          // unique: true,
        },
        description: {
          type: Sequelize.STRING,
        },
        price: {
          type: Sequelize.DECIMAL,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.dropTable(options);
  },
};
