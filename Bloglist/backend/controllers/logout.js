const logoutRouter = require("express").Router();
const { Session } = require("../models");
const { getTokenFrom, userExtractor } = require('../utils/middleware')

logoutRouter.delete("/", getTokenFrom, async (request, response) => {
    const token = request.token
    await Session.destroy({
        where: {
            token: token
        }
    })
});

module.exports = logoutRouter;
