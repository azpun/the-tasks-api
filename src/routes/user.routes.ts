import { Router } from 'express'
import { createUser, getUsers } from '../controllers/user.controller.js'
import { createSession, refreshToken } from '../controllers/auth.controller.js'
import { requireAdmin } from '../middleware/auth.middleware.js'

export const UserRouter = Router()

// get users data
UserRouter.get('/', requireAdmin, getUsers)

// add new users
UserRouter.post('/auth/register', createUser)

// login
UserRouter.post('/auth/login', createSession)

UserRouter.post('/auth/refresh', refreshToken)
