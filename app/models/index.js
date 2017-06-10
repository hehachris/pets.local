const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');

const Customer = require('./Customer');
const CustomerAdoption = require('./CustomerAdoption');
const CustomerPreference = require('./CustomerPreference');
const Pet = require('./Pet');

module.exports = {
    Sequelize,
    sequelize,

    Customer,
    CustomerAdoption,
    CustomerPreference,
    Pet
};
