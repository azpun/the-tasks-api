import { Router } from 'express'
import { getUsers } from '../controllers/user.controller.js'
import { requireAdmin } from '../middleware/auth.middleware.js'

export const UserRouter = Router()

// get users data
UserRouter.get('/', requireAdmin, getUsers)
