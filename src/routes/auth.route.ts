import { Router } from 'express'
import { createSession, refreshToken } from '../controllers/auth.controller.js'
import { createUser } from '../controllers/user.controller.js'
import { loginValidation, refreshSessionValidation, registerValidation } from '../middleware/auth.middleware.js'

export const AuthRouter = Router()

// add new users
AuthRouter.post('/register', registerValidation, createUser)

// login
AuthRouter.post('/login', loginValidation, createSession)

// refresh token
AuthRouter.post('/refresh', refreshSessionValidation, refreshToken)
