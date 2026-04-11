import { type Request, type Response } from 'express'
import { logger } from '../utils/logger.js'
import { createUserDB, getUsersDB } from '../services/user.service.js'
import { v7 as uuidv7 } from 'uuid'
import { createUserValidation } from '../validations/user.validation.js'
import { hashPassword } from '../utils/hash.js'

// get users data
export const getUsers = async (req: Request, res: Response) => {
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
export const createUser = async (req: Request, res: Response) => {
  req.body.user_id = uuidv7()
  const result = await createUserValidation(req.body)

  console.log(result)
  console.log(result.data)
  if (result.success === false) {
    logger.error('Add New User Failed')
    return res.status(400).send({
      message: 'Users',
      status: false,
      statusCode: 400,
      statusText: 'Bad Request',
      data: result.error
    })
  }

  try {
    if (result.data && result.data.password) {
      result.data.password = `${await hashPassword(req.body.password)}`
    }
    const data = result.data
    await createUserDB(data)

    logger.info('Add New User Success')
    res.status(201).send({
      message: 'Users',
      status: true,
      statusCode: 201,
      statusText: 'OK - User Created'
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
