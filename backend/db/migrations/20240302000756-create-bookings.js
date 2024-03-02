'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users', // Ensure this matches the actual table name
            schema: options.schema // Include schema if applicable
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // or 'CASCADE' depending on your application logic
      },
      spotId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Spots', // Ensure this matches the actual table name
            schema: options.schema // Include schema if applicable
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // or 'CASCADE' depending on your application logic
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bookings', options);
  }
};
