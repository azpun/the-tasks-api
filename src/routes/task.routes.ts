import { Router } from 'express'
import { createTask, deleteTask, getTaskByIdHandler, getTasks, updateTask } from '../controllers/task.controller.js'
import { requireUser } from '../middleware/auth.middleware.js'
import { validateTaskId, validateTaskPayload, validateTaskUpdate } from '../middleware/task.middleware.js'

export const TaskRouter = Router()

// get tasks data
TaskRouter.get('/', requireUser, getTasks)
// get task data by task title
TaskRouter.get('/:id', requireUser, validateTaskId, getTaskByIdHandler)

// add new task
TaskRouter.post('/', requireUser, validateTaskPayload, createTask)

// update task
TaskRouter.put('/:id', requireUser, validateTaskId, validateTaskUpdate, updateTask)

// delete task
TaskRouter.delete('/:id', requireUser, validateTaskId, deleteTask)
