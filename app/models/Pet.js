const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');

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
    age:  {
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
    }
});

module.exports = Pet;
