import { Router } from 'express'
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/task.controller.js'
import { requireUser } from '../middleware/auth.middleware.js'

export const TaskRouter = Router()

// get tasks data
TaskRouter.get('/', getTasks)
// get task data by task title
TaskRouter.get('/:id', requireUser, getTasks)

// add new task
TaskRouter.post('/', requireUser, createTask)

// update task
TaskRouter.put('/:id', requireUser, updateTask)

TaskRouter.delete('/:id', requireUser, deleteTask)
