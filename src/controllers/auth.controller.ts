import { type Request, type Response } from 'express'
import { logger } from '../utils/logger.ts'
import { createSessionValidation } from '../validations/auth.validation.ts'
import type { UserValidation } from '../validations/user.validation.ts'
import { getUserByEmail } from '../services/user.service.ts'
import { comparePassword } from '../utils/hash.ts'
import { generateToken } from '../utils/jwt.ts'

export const createSession = async (req: Request, res: Response) => {
  const result = createSessionValidation(req.body)
  if (result.error) {
    logger.error(`ERROR: auth login: ${result.error}`)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      massage: result.error.message
    })
  }
  try {
    const user: UserValidation = await getUserByEmail(result.data.email)
    const isValid = comparePassword(result.data.password, user.password)

    if (!isValid) {
      return res.status(401).send({
        status: false,
        statusCode: 401,
        massage: 'Invalid email or password'
      })
    }

    const accessToken = generateToken({ ...user }, { expiresIn: '1h' })

    if (accessToken) {
      res.send({
        status: true,
        statusCode: 200,
        message: 'Login successful',
        data: {
          accessToken
        }
      })
    } else {
      res.status(500).send({
        status: false,
        statusCode: 500,
        massage: 'Failed to generate access token'
      })
    }
  } catch (error) {
    logger.error(`Create Session Failed: ${error}`)
    res.status(500).send({
      status: false,
      statusCode: 500,
      massage: 'Internal Server Error'
    })
  }
}
