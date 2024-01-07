const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class Blog extends Model {}

Blog.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: DataTypes.STRING,
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likes: DataTypes.INTEGER
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
})

module.exports = Blog;