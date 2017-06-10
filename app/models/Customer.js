const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');

const CustomerPreference = require('./CustomerPreference');

const Customer = sequelize.define('customer', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Customer.hasOne(CustomerPreference);

module.exports = Customer;
