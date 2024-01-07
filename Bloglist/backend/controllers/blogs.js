const blogsRouter = require("express").Router();
const { Blog } = require("../models");
const { User } = require("../models");
const { Comment } = require("../models");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username", "name"],
        },
      ],
    });
    return response.status(200).json(blogs);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  console.log(request.user)
  //const user = await User.findByPk(request.user);
  const blog =  await Blog.create({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    userId: request.user,
  });
  response.status(201).json(blog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const checkIdBlog = await Blog.findByPk(request.params.id);
  if (!checkIdBlog) {
    return response.status(404).end();
  }

  try {
    await Blog.destroy({
      where: {
        id: request.params.id,
      },
    });
    console.log("deleted");
    return response.status(204).end();
  } catch (error) {
    next(error)
  } 
});

module.exports = blogsRouter;
