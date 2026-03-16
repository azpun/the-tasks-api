import userModel from '../models/user.model.ts'
import type { UserValidation } from '../validations/user.validation.ts'
import { logger } from '../utils/logger.ts'

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
