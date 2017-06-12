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
                type: Sequelize.STRING,
                allowNull: true
            },
            breed: { // For dogs only
                type: Sequelize.STRING,
                allowNull: true
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('customer_preferences');
    }
};
