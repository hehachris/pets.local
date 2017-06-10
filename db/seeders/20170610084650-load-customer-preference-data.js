'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('customer_preferences', [
            {
                id: 1,
                customer_id: 1,
                age: 2,
                species: 'Dog',
                breed: 'Poodle'
            },
            {
                id: 2,
                customer_id: 2,
                age: null,
                species: 'Dog,Cat',
                breed: null
            },
            {
                id: 3,
                customer_id: 3,
                age: null,
                species: null,
                breed: null
            }
        ], {});
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('customer_preferences', null, {});
    }
};
