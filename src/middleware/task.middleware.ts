import type { Request, Response, NextFunction } from 'express'
import { createTaskValidation, updateTaskValidation } from '../validations/task.validation.js'
import { logger } from '../utils/logger.js'
import { v7 as uuidv7 } from 'uuid'

export const validateTaskId = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string

  if (!id || typeof id !== 'string') {
    return res.status(400).send({
      status: false,
      statusCode: 400,
      statusText: 'Bad Request',
      message: 'Invalid or missing task id'
    })
  }

  //
  if (id.length > 37) {
    return res.status(400).send({
      status: false,
      statusCode: 400,
      statusText: 'Bad Request',
      message: 'Invalid task id'
    })
  }

  //   req.params.id = id.trim() // Remove leading and trailing whitespace from the id
  req.params.id = id.trim()

  next()
}

export const validateTaskPayload = async (req: Request, res: Response, next: NextFunction) => {
  req.body.task_id = uuidv7()
  const result = await createTaskValidation(req.body)

  //
  if (result.success === false) {
    logger.error(`Add New Task Failed: ${result.error}`)
    return res.status(400).send({
      message: 'Tasks',
      status: false,
      statusCode: 400,
      statusText: 'Bad Request'
    })
  }

  //  req.body = result.data --- IGNORE ---
  req.body = result.data

  next()
}

export const validateTaskUpdate = async (req: Request, res: Response, next: NextFunction) => {
  const task = await updateTaskValidation(req.body)

  if (task.success === false) {
    logger.error(`Add New Task Failed: ${task.error}`)
    return res.status(400).send({
      message: 'Tasks',
      status: false,
      statusCode: 400,
      statusText: 'Bad Request'
    })
  }

  req.body = task.data

  next()
}
