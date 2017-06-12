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
                breed: 'Pomeranian',
                latitude: 22.36631362,
                longitude: 114.05724227
            },
            {
                id: 2,
                name: 'Dicky',
                available_from: '2016-12-15',
                age: 10,
                species: 'Dog',
                breed: 'Labrador',
                latitude: 22.36675018,
                longitude: 114.06058967
            },
            {
                id: 3,
                name: 'Jon Snow',
                available_from: '2016-12-15',
                age: 1,
                species: 'Cat',
                breed: null,
                latitude: 22.35995863,
                longitude: 114.10458326
            },
            {
                id: 4,
                name: 'King Slayer',
                available_from: '2016-12-15',
                age: 2,
                species: 'Cat',
                breed: null,
                latitude: 22.3531717,
                longitude: 114.10205126
            },
            {
                id: 5,
                name: 'White Walker',
                available_from: '2016-12-15',
                age: 5,
                species: 'Dog',
                breed: 'Terrier',
                latitude: 22.36230024,
                longitude: 114.11269426
            },
            {
                id: 6,
                name: 'Snowball',
                available_from: '2016-12-15',
                age: 1,
                species: 'Rabbit',
                breed: null,
                latitude: 22.3567835,
                longitude: 114.12758589
            }
        ], {});
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('pets', null, {});
    }
};
