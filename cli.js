const Blog = require('./backend/models/blog.js')
const { sequelize } = require('./backend/utils/db.js')

const findBlogs = async () => {
  const blogs = await Blog.findAll()
  blogs.map(blog => console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`))
  sequelize.close()
}
findBlogs()