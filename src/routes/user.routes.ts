import { Router } from 'express'
import { createUser, getUsers } from '../controllers/user.controller.ts'
import { createSession, refreshToken } from '../controllers/auth.controller.ts'
// import { requireAdmin } from '../middleware/auth.middleware.ts'

export const UserRouter = Router()

// get users data
UserRouter.get('/', getUsers)

// add new users
UserRouter.post('/auth/register', createUser)

// login
UserRouter.post('/auth/login', createSession)

UserRouter.post('/auth/refresh', refreshToken)
