// import { refreshToken } from './../controllers/auth.controller'
import jwt from 'jsonwebtoken'
import CONFIG from '../config/environtment.js'
import { logger } from './logger.js'
// import { getUserByEmail } from '../services/user.service.js'

export const generateToken = (payload: object, SignOptions?: jwt.SignOptions | undefined) => {
  if (CONFIG.jwt_private) {
    return jwt.sign(payload, CONFIG.jwt_private, {
      ...(SignOptions && SignOptions),
      algorithm: 'RS256'
    })
  } else {
    logger.error('JWT private key is not defined')
    throw new Error('JWT private key is not defined')
  }
}

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, CONFIG.jwt_public)
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error) {
    return {
      valid: false,
      expired: error instanceof jwt.TokenExpiredError,
      decoded: null
    }
  }
}

// export const refreshAccessToken = async (refreshToken: string) => {

// }
