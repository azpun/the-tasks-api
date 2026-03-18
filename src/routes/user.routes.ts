import { Router } from 'express'
import { createUser, getUsers } from '../controllers/user.controller.ts'
import { createSession } from '../controllers/auth.controller.ts'

export const UserRouter = Router()

// get users data
UserRouter.get('/', getUsers)

// add new users
UserRouter.post('/auth/register', createUser)

// login
UserRouter.post('/auth/login', createSession)
