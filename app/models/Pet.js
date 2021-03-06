const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');

const config = require('../../config');

const Pet = sequelize.define('pet', {
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
    },
    latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: true
    },
    longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: true
    }
}, config.modelOptions);

module.exports = Pet;
