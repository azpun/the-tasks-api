import { Router } from 'express'
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/task.controller.ts'

export const TaskRouter = Router()

// get tasks data
TaskRouter.get('/', getTasks)
// get task data by task title
TaskRouter.get('/:id', getTasks)

// add new task
TaskRouter.post('/', createTask)

// update task
TaskRouter.put('/:id', updateTask)

TaskRouter.delete('/:id', deleteTask)
