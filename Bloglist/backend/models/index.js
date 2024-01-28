const User = require('./user');
const Blog = require('./blog');
const Comment = require('./comment');
const Readinglist = require('./readinglist');


User.hasMany(Blog);
Blog.belongsTo(User);

Blog.hasMany(Comment);
Comment.belongsTo(Blog);

User.belongsToMany(Blog, { through: Readinglist, as: 'reading'});
Blog.belongsToMany(User, { through: Readinglist, as : 'readinglists'});

/*

User.sync({ alter: true });
Blog.sync({ alter: true });
Comment.sync({ alter: true });

*/

module.exports = {
    User,
    Blog,
    Comment,
    Readinglist
};

