const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },

    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'products',
    timestamps: true
});

module.exports = Product;