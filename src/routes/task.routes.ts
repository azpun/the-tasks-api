import { Router } from 'express'
import { createTask, getTasks } from '../controllers/task.controller.ts'

export const TaskRouter = Router()

// get tasks data
TaskRouter.get('/', getTasks)

// add new task
TaskRouter.post('/', createTask)
