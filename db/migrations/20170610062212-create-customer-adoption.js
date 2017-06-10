'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('customer_adoptions', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            customer_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'customer',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            pet_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'pet',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('customer_adoptions');
    }
};
