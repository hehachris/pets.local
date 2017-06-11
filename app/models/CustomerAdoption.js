const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');

const config = require('../../config');

const Customer = require('./Customer');
const Pet = require('./Pet');

const CustomerAdoption = sequelize.define('customer_adoption', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, config.modelOptions);

CustomerAdoption.belongsTo(Customer);
CustomerAdoption.belongsTo(Pet);

module.exports = CustomerAdoption;
