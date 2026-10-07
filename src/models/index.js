const sequelize = require('../config/database');

const Category = require('./Category');
const Product = require('./Product');

Category.hasMany(Product, {
    foreignKey: 'categoryId',
    onDelete: 'RESTRICT'
});

Product.belongsTo(Category, {
    foreignKey: 'categoryId'
});

module.exports = {
    sequelize,
    Category,
    Product
};