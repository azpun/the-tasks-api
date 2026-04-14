import { type Request, type Response } from 'express'
import { logger } from '../utils/logger.js'
import type { UserValidation } from '../validations/user.validation.js'
import { getUserByEmail } from '../services/user.service.js'
import { comparePassword } from '../utils/hash.js'
import { generateToken, verifyToken } from '../utils/jwt.js'

export const createSession = async (req: Request, res: Response) => {
  try {
    const user: UserValidation = await getUserByEmail(req.body.email)
    const isValid = await comparePassword(req.body.password, user.password)

    if (!isValid) {
      logger.error('Invalid email or password')
      return res.status(401).send({
        status: false,
        statusCode: 401,
        massage: 'Invalid email or password'
      })
    }

    const accessToken = generateToken({ ...user }, { expiresIn: '1h' })

    const refreshToken = generateToken({ ...user }, { expiresIn: '1y' })

    if (accessToken) {
      res.send({
        status: true,
        statusCode: 200,
        message: 'Login successful',
        data: {
          accessToken,
          refreshToken
        }
      })
    } else {
      logger.error('Failed to generate access token')
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

export const refreshToken = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { decoded }: any = verifyToken(req.body.refreshToken)

    const user = await getUserByEmail(decoded.email)
    if (!user) return false

    const accessToken = generateToken({ ...user }, { expiresIn: '1d' })
    const newRefreshToken = generateToken({ ...user }, { expiresIn: '1y' })

    if (accessToken) {
      res.send({
        status: true,
        statusCode: 200,
        message: 'Token refreshed successfully',
        data: {
          newRefreshToken: newRefreshToken
        }
      })
    } else {
      res.status(500).send({
        status: false,
        statusCode: 500,
        massage: 'Failed to generate refresh token'
      })
    }
  } catch (error) {
    logger.error(`Refresh Token Failed: ${error}`)
    res.status(500).send({
      status: false,
      statusCode: 500,
      massage: `Internal Server Error: ${error}`
    })
  }
}
