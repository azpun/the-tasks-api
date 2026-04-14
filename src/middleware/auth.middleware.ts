import type { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger.js'
import { createSessionValidation, refreshTokenValidation } from '../validations/auth.validation.js'
import { v7 as uuidv7 } from 'uuid'
import { createUserValidation } from '../validations/user.validation.js'
import { hashPassword } from '../utils/hash.js'

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user

  if (!user) {
    return res.sendStatus(403)
  }
  return next()
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user
  if (!user && user._doc.role !== 'admin') {
    return res.sendStatus(403)
  }
  return next()
}

export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const result = createSessionValidation(req.body)
  if (result.error) {
    logger.error(`ERROR: auth login: ${result.error}`)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      massage: result.error.message
    })
  }
  req.body = result.data
  next()
}

export const refreshSessionValidation = (req: Request, res: Response, next: NextFunction) => {
  const result = refreshTokenValidation(req.body)
  if (result.error) {
    logger.error(`ERROR - refresh token: ${result.error}`)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      massage: result.error.message
    })
  }
  req.body = result.data
  next()
}

export const registerValidation = async (req: Request, res: Response, next: NextFunction) => {
  req.body.user_id = uuidv7()
  const result = await createUserValidation(req.body)

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

  if (result.data && result.data.password) {
    result.data.password = `${await hashPassword(req.body.password)}`
  }

  req.body = result.data
  next()
}
