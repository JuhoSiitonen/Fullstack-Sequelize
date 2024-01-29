const logger = require('./logger')
const jwt = require('jsonwebtoken')
const Session = require('../models/session')


const getTokenFrom = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }else {
    request.user = decodedToken.id
  }
  try {
    const session = await Session.findOne({
      where: {
        token: request.token
      }
    })
  }
  catch (error) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (!session) {
    return response.status(401).json({ error: 'token invalid' })
  }

  next()
}

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError') {
    return response.status(400).json({ error : error.message })
  }else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token missing or invalid' })
  }else if (error.name === 'SequelizeDatabaseError') {
    return response.status(500).json({ error: error.message })
  } else if (error.name === 'TypeError') {
    return response.status(500).json({ error: error.message })
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(500).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getTokenFrom,
  userExtractor
}