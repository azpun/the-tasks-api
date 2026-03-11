import { type Request, type Response } from 'express'
import { logger } from '../utils/logger.ts'
import { createTaskValidation, type TaskValidation } from '../validations/task.validation.ts'
import { addTasksDB, getTasksDB } from '../services/task.service.ts'
import { v7 as uuidv7 } from 'uuid'

const getTasks = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tasks: any = await getTasksDB()
    const {
      params: { task }
    } = req

    if (task) {
      const fileteredTasks = tasks.filter((data: TaskValidation) => {
        if (data.task === task) {
          return data
        }
      })
      if (fileteredTasks.length === 0) {
        logger.info('Data Not Found')
        res.status(404).send({
          message: 'Tasks',
          status: false,
          statusCode: 404,
          statusText: 'Not Found',
          data: []
        })
      } else {
        logger.info('Get Task Data Success')
        return res.status(200).send({
          message: 'Tasks',
          status: true,
          statusCode: 200,
          statusText: 'OK',
          data: fileteredTasks[0]
        })
      }
    }

    logger.info('Get Tasks Data Success')
    return res.status(200).send({
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
}

const createTask = async (req: Request, res: Response) => {
  req.body.task_id = uuidv7()
  const result = createTaskValidation(req.body)

  if (result.success === false) {
    logger.error(`Add New Task Failed: ${result.error}`)
    return res.status(400).send({
      message: 'Tasks',
      status: false,
      statusCode: 400,
      statusText: 'Bad Request',
      data: result.error
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

export { getTasks, createTask }
