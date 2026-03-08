import { Router } from 'express'
import { createUser, getUsers } from '../controllers/user.controller.ts'

export const UserRouter = Router()

// get users data
UserRouter.get('/', getUsers)

// add new users
UserRouter.post('/', createUser)
