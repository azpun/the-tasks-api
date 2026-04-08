import userModel from '../models/user.model.js'
import type { UserValidation } from '../validations/user.validation.js'
import { logger } from '../utils/logger.js'

export const createUserDB = async (payload: UserValidation) => {
  return await userModel.create(payload as Parameters<typeof userModel.create>[0]).catch((err) => {
    logger.info('Cannot create user to DB')
    logger.error(err)
  })
}

export const getUsersDB = async () => {
  return await userModel
    .find()
    .then((data) => {
      return data
    })
    .catch((err) => {
      logger.info('Cannot get users data from DB')
      logger.error(err)
    })
}

export const getUserByEmail = async (email: string) => {
  const user = await userModel.findOne({ email })
  if (!user) {
    throw new Error('User not found')
  }
  if (!user.user_id || !user.email) {
    throw new Error('Invalid user data')
  }
  return {
    user_id: user.user_id,
    email: user.email,
    name: user.name,
    password: user.password,
    role: user.role as 'user' | 'admin'
  }
}
