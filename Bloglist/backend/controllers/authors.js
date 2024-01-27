const authorsRouter = require("express").Router();
const { Blog } = require("../models");
const { User } = require("../models");
const { Comment } = require("../models");
const { sequelize } = require('../utils/db');
const { Op } = require('sequelize')


authorsRouter.get("/", async (request, response) => {
     const blogs = await Blog.findAll({
        attributes: [
            [sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
            'author'
    
          ],
          group: ['author'],
          order: [
            [sequelize.col('likes'), 'DESC']
          ]
        })
        
    const result = blogs.map(author => {
        return {
        author: author.dataValues.author,
        blogs: author.dataValues.blogs.toString(),
        likes: author.dataValues.likes.toString()
          }
        })
        response.json(result)
    })



module.exports = authorsRouter;   