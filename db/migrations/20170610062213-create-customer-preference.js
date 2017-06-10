'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('customer_preferences', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            customer_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'customers',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            age: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            species: {
                type: Sequelize.ENUM('cat', 'dog', 'rabbit'),
                allowNull: true
            },
            breed: { // For dogs only
                type: Sequelize.ENUM('labrador', 'poodle', 'spaniel', 'terrier'),
                allowNull: true
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('customer_preferences');
    }
};
