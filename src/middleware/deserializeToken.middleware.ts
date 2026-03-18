import type { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt.ts'

const deserializeToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.replace(/Bearer\s/, '')
  if (!accessToken) {
    return next()
  }

  const token = verifyToken(accessToken)
  if (token.decoded) {
    res.locals.user = token.decoded
    return next()
  } else if (token.expired) {
    return res.status(401).send({
      status: false,
      statusCode: 401,
      message: 'Access token expired'
    })
  } else {
    return next()
  }
}

export default deserializeToken
