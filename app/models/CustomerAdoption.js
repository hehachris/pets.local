const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');

const Customer = require('./Customer');
const Pet = require('./Pet');

const CustomerAdoption = sequelize.define('customer_adoption', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

CustomerAdoption.belongsTo(Customer);
CustomerAdoption.belongsTo(Pet);

module.exports = CustomerAdoption;
