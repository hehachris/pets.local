'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('pets', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            available_from: {
                type: Sequelize.DATE,
                allowNull: false
            },
            age: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            species: {
                type: Sequelize.ENUM('Cat', 'Dog', 'Rabbit'),
                allowNull: false
            },
            breed: { // For dogs only
                type: Sequelize.ENUM('Labrador', 'Poodle', 'Spaniel', 'Terrier', 'Pomeranian'),
                allowNull: true
            },
            is_adopted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('pets');
    }
};
