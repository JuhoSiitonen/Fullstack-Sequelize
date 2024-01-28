const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class Readinglist extends Model {}

Readinglist.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        refecences: {
            model: 'user',
            key: 'id',
        },
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        refecences: {
            model: 'blog',
            key: 'id',
        },
    },
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'readinglist'
})

module.exports = Readinglist;