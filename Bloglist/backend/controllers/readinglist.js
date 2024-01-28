const readinglistRouter = require("express").Router();
const { Readinglist } = require("../models");

readinglistRouter.post("/", async (request, response) => {
    const { body } = request;
    const { user_id, blog_id } = body;
    const readinglist = await Readinglist.create({
        userId: user_id,
        blogId: blog_id,
        read: false,
    });
    response.json(readinglist);
    }
);

module.exports = readinglistRouter;