const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Filing = sequelize.define('Filing', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    filing_type: {
        type: DataTypes.STRING, // e.g., 'STOCK_ACT', '13F', '4'
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    ticker: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    transaction_type: {
        type: DataTypes.STRING, // 'buy', 'sell'
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL, // Value in USD
    },
    price: {
        type: DataTypes.DECIMAL, // Price per share
    },
    volume: {
        type: DataTypes.INTEGER, // Number of shares
    },
    source_url: {
        type: DataTypes.STRING,
    },
});

module.exports = Filing;
