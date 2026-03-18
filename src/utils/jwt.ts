import jwt from 'jsonwebtoken'
import CONFIG from '../config/environtment.ts'
import { logger } from './logger.ts'

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
