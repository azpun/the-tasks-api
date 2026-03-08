import { Router, type Request, type Response } from 'express'
import tasks from '../data/tasks.json' with { type: 'json' }
import { logger } from '../utils/logger.ts'
import { createTaskValidation } from '../validation/task.validation.ts'

export const TaskRouter = Router()

// get tasks data
TaskRouter.get('/', (req: Request, res: Response) => {
  try {
    logger.info('Get Tasks Data Success')
    res.status(200).send({
      message: 'Tasks',
      status: true,
      statusCode: 200,
      statusText: 'OK',
      data: tasks
    })
  } catch (error) {
    logger.error('Get Tasks Data Failed')
    res.status(500).send({
      message: 'Tasks',
      status: false,
      statusCode: 500,
      statusText: 'Internal Server Error',
      data: error
    })
  }
})

// add new task
TaskRouter.post('/', (req: Request, res: Response) => {
  try {
    const validation = createTaskValidation(req.body)
    if (!validation.success) {
      logger.error('Add New Task Failed')
      res.status(400).send({
        message: 'Tasks',
        status: false,
        statusCode: 400,
        statusText: 'Bad Request',
        data: validation.error
      })
    }
    logger.info('Add New Task Success')
    res.status(200).send({
      message: 'Tasks',
      status: true,
      statusCode: 200,
      statusText: 'OK',
      data: req.body
    })
  } catch (error) {
    logger.error('Add New Task Failed')
    res.status(500).send({
      message: 'Tasks',
      status: false,
      statusCode: 500,
      statusText: 'Internal Server Error',
      data: error
    })
  }
})
