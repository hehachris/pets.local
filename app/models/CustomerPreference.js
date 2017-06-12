const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');

const config = require('../../config');

const CustomerPreference = sequelize.define('customer_preference', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
}, config.modelOptions);

module.exports = CustomerPreference;
