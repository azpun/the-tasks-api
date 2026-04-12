import { Router } from 'express'
import { createSession, refreshToken } from '../controllers/auth.controller.js'
import { createUser } from '../controllers/user.controller.js'

export const AuthRouter = Router()

// add new users
AuthRouter.post('/register', createUser)

// login
AuthRouter.post('/login', createSession)

// refresh token
AuthRouter.post('/refresh', refreshToken)
