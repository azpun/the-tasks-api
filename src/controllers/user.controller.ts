import { type Request, type Response } from 'express'
import { logger } from '../utils/logger.ts'
import { getUsersDB } from '../services/user.service.ts'

// get users data
const getUsers = async (req: Request, res: Response) => {
  try {
    const usersDB = await getUsersDB()
    logger.info('Get Users Data Success')
    res.status(200).send({
      message: 'Users',
      status: true,
      statusCode: 200,
      statusText: 'OK',
      data: usersDB
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
}

// add user
const createUser = (req: Request, res: Response) => {
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
}

export { getUsers, createUser }