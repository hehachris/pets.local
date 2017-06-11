'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('pets', [
            {
                id: 1,
                name: 'Miu Miu',
                available_from: '2016-12-15',
                age: 0,
                species: 'Dog',
                breed: 'Pomeranian'
            },
            {
                id: 2,
                name: 'Dicky',
                available_from: '2016-12-15',
                age: 10,
                species: 'Dog',
                breed: 'Labrador'
            },
            {
                id: 3,
                name: 'Jon Snow',
                available_from: '2016-12-15',
                age: 1,
                species: 'Cat',
                breed: null
            },
            {
                id: 4,
                name: 'King Slayer',
                available_from: '2016-12-15',
                age: 2,
                species: 'Cat',
                breed: null
            },
            {
                id: 5,
                name: 'White Walker',
                available_from: '2016-12-15',
                age: 5,
                species: 'Dog',
                breed: 'Terrier'
            },
            {
                id: 6,
                name: 'Snowball',
                available_from: '2016-12-15',
                age: 1,
                species: 'Rabbit',
                breed: null
            }
        ], {});
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('pets', null, {});
    }
};
