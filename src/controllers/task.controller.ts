import { type Request, type Response } from 'express'
import { logger } from '../utils/logger.ts'
import { createTaskValidation, updateTaskValidation } from '../validations/task.validation.ts'
import { addTasksDB, deleteTaskById, getTaskById, getTasksDB, updateTaskById } from '../services/task.service.ts'
import { v7 as uuidv7 } from 'uuid'

const getTasks = async (req: Request, res: Response) => {
  try {
    const {
      params: { id }
    } = req

    // get task by id
    if (id) {
      let taskId: string | undefined
      if (typeof id === 'string') {
        taskId = id
      } else if (Array.isArray(id) && id.length > 0) {
        taskId = id[0]
      }
      if (!taskId) {
        logger.info('Get Task Data Failed: Invalid id')
        return res.status(400).send({
          message: 'Tasks',
          status: false,
          statusCode: 400,
          statusText: 'Bad Request',
          data: []
        })
      }
      const tasks = await getTaskById(taskId)

      if (tasks) {
        logger.info('Get Task Data Success')
        return res.status(200).send({
          message: 'Tasks',
          status: true,
          statusCode: 200,
          statusText: 'OK',
          data: tasks
        })
      } else {
        logger.info('Get Task Data Failed')
        return res.status(404).send({
          message: 'Tasks',
          status: true,
          statusCode: 404,
          statusText: 'Data Not Found',
          data: []
        })
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tasks: any = await getTasksDB()
      logger.info('Get Tasks Data Success')
      return res.status(200).send({
        message: 'Tasks',
        status: true,
        statusCode: 200,
        statusText: 'OK',
        data: tasks
      })
    }
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
}

const createTask = async (req: Request, res: Response) => {
  req.body.task_id = uuidv7()
  const result = await createTaskValidation(req.body)

  if (result.success === false) {
    logger.error(`Add New Task Failed: ${result.error}`)
    return res.status(400).send({
      message: 'Tasks',
      status: false,
      statusCode: 400,
      statusText: 'Bad Request'
    })
  }

  try {
    const data = result.data
    await addTasksDB(data)

    logger.info('Add New Task Success')
    res.status(200).send({
      message: 'Tasks',
      status: true,
      statusCode: 201,
      statusText: 'Created'
    })
  } catch (error) {
    logger.error(`Add New Task Failed: ${error}`)
    res.status(500).send({
      message: 'Tasks',
      status: false,
      statusCode: 500,
      statusText: 'Internal Server Error'
    })
  }
}

const updateTask = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req
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
  try {
    const data = task.data
    if (typeof id !== 'string') {
      logger.error('Update Task Failed: Invalid or missing id')
      return res.status(400).send({
        message: 'Tasks',
        status: false,
        statusCode: 400,
        statusText: 'Bad Request'
      })
    }
    await updateTaskById(id, data)
    logger.info('Update Task Success')
    res.status(200).send({
      message: 'Tasks',
      status: true,
      statusCode: 200,
      statusText: 'OK'
    })
  } catch (error) {
    logger.error(`Add New Task Failed: ${error}`)
    res.status(500).send({
      message: 'Tasks',
      status: false,
      statusCode: 500,
      statusText: 'Internal Server Error'
    })
  }
}

const deleteTask = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req
  try {
    if (typeof id !== 'string') {
      logger.error('Delete Task Failed: Invalid or missing id')
      return res.status(400).send({
        message: 'Tasks',
        status: false,
        statusCode: 400,
        statusText: 'Bad Request'
      })
    }
    await deleteTaskById(id)
    logger.info('Delete Task Success')
    res.status(200).send({
      message: 'Tasks',
      status: true,
      statusCode: 200,
      statusText: 'OK - Delete Successfully'
    })
  } catch (error) {
    logger.error(`Delete Task Failed: ${error}`)
    res.status(500).send({
      message: 'Tasks',
      status: false,
      statusCode: 500,
      statusText: 'Internal Server Error'
    })
  }
}

export { getTasks, createTask, updateTask, deleteTask }
