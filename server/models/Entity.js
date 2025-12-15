const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Entity = sequelize.define('Entity', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('politician', 'institution', 'insider'),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
});

module.exports = Entity;
