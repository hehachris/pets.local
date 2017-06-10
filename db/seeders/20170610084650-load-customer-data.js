'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('customers', [
            {
                id: 1,
                name: 'Alice'
            },
            {
                id: 2,
                name: 'Bob'
            },
            {
                id: 3,
                name: 'Charlie'
            }
        ], {});
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('customers', null, {});
    }
};
