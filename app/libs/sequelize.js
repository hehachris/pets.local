const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/db.json')[env];

module.exports = new Sequelize(`${config.dialect}:${config.storage}`, {
    define: {
        timestamps: false // Disable timestamp columns
    }
});
