const Sequelize = require('sequelize');

const sequelize = new Sequelize
(
    'node-completed', 'root', 'yvessaintlaurent', 
    {
        dialect: 'mysql',
        host: 'localhost',
    }
);

module.exports = sequelize;