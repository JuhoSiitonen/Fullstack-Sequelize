const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const { User } = require('../models')
const { Blog } = require('../models')

userRouter.get('/', async (request, response) => {
    const users = await User.findAll({ 
      include: 
      { model: Blog } ,
    })
    return response.json(users)
})

userRouter.post('/', async (request, response) => {
   const { username, name, password } = request.body

   if (password === undefined || password.length < 5) {
    return response.status(400).json({ error: 'Password needs to be atleast 3 characters long' })
   }

   const saltRounds = 10 
   const passwordHash = await bcrypt.hash(password, saltRounds)

   const newUser = await User.create({
    username: username,
    name: name,
    passwordHash: passwordHash,
    disabled: false,
  })

  response.status(201).json(newUser)
})

userRouter.put('/:username', async (request, response) => {
    const { username } = request.params

    const user = await User.findOne({ where: { username: username } })
    user.name = request.body.name
    await user.save()

    response.status(200).json(user)
})

userRouter.get('/:id', async (request, response) => {
    const { id } = request.params
    const { read } = request.query
    const where = {}

    if (read === 'true' || read === 'false') {
        where.read = (read === 'true')
    }

    try {
        const user = await User.findByPk(id, { 
          include: 
            { model: Blog,
              as: 'reading',
              through: {
                as: 'readinglist',
                attributes: ['read', 'id'],
                where
              },
            },
          })
        response.status(200).json(user)
    }
    catch (error) {
        response.status(400).json({ error: error.message })
    }
})


module.exports = userRouter