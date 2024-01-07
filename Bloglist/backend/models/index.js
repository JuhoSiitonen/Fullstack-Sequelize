const User = require('./user');
const Blog = require('./blog');
const Comment = require('./comment');


User.hasMany(Blog);
Blog.belongsTo(User);

Blog.hasMany(Comment);
Comment.belongsTo(Blog);

User.sync({ alter: true });
Blog.sync({ alter: true });
Comment.sync({ alter: true });

module.exports = {
    User,
    Blog,
    Comment
};