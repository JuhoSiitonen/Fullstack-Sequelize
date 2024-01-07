const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class Comment extends Model {}

Comment.init({
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'comment'
})

module.exports = Comment;