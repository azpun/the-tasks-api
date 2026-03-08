import { Router, type Request, type Response } from 'express'
import users from '../data/users.json' with { type: 'json' }
import { logger } from '../utils/logger.ts'

export const UserRouter = Router()

// get users data
UserRouter.get('/', (req: Request, res: Response) => {
  try {
    logger.info('Get Users Data Success')
    res.status(200).send({
      message: 'Users',
      status: true,
      statusCode: 200,
      statusText: 'OK',
      data: users
    })
  } catch (error) {
    logger.error('Get Users Data Failed')
    res.status(500).send({
      message: 'Users',
      status: false,
      statusCode: 500,
      statusText: 'Internal Server Error',
      data: error
    })
  }
})

// add new users
UserRouter.post('/', (req: Request, res: Response) => {
  try {
    logger.info('Add New User Success')
    res.status(200).send({
      message: 'Users',
      status: true,
      statusCode: 200,
      statusText: 'OK',
      data: req.body
    })
  } catch (error) {
    logger.error('Add New User Failed')
    res.status(500).send({
      message: 'Users',
      status: false,
      statusCode: 500,
      statusText: 'Internal Server Error',
      data: error
    })
  }
})
