const Sequelize = require('sequelize');

const sequelize = require('../util/database');

OrderItem = sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = OrderItem;