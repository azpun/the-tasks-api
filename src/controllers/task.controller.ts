import { type Request, type Response } from 'express'
import { logger } from '../utils/logger.ts'
import { createTaskValidation } from '../validations/task.validation.ts'
import { getTasksDB } from '../services/task.service.ts'

interface TaskType {
  task_id: string,
  title: string,
  priority: string,
  isDone: boolean
}

const getTasks = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tasks: any = await getTasksDB()
    const { params: {taskTitle} } = req
    if (taskTitle) {
        const fileteredTasks = tasks.filter((task: TaskType) => {
            if (task.title === taskTitle) {
                return task
            }
        })
        if (fileteredTasks.length === 0){
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
          res.status(200).send({
              message: 'Tasks',
              status: true,
              statusCode: 200,
              statusText: 'OK',
              data: fileteredTasks[0]    
          })
        }
      }
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
}

const createTask = (req: Request, res: Response) => {
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
}

export { getTasks, createTask }