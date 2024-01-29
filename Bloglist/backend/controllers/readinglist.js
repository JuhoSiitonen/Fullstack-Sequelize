const readinglistRouter = require("express").Router();
const { Readinglist } = require("../models");
const { getTokenFrom, userExtractor } = require('../utils/middleware')

readinglistRouter.post("/", getTokenFrom, userExtractor, async (request, response) => {
    const { body } = request;
    const { user_id, blog_id } = body;
    if (user_id !== request.user.id) {
        return response.status(401).json({ error: 'Unauthorized user' });
    }
    const readinglist = await Readinglist.create({
        userId: user_id,
        blogId: blog_id,
        read: false,
    });
    response.json(readinglist);
    }
);

module.exports = readinglistRouter;