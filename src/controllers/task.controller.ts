import { type Request, type Response } from 'express'
import { logger } from '../utils/logger.js'
import { addTasksDB, deleteTaskById, getTaskById, getTasksDB, updateTaskById } from '../services/task.service.js'
// import { v7 as uuidv7 } from 'uuid'

const getTasks = async (req: Request, res: Response) => {
  try {
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

const getTaskByIdHandler = async (req: Request, res: Response) => {
  const id = req.params.id as string

  const task = await getTaskById(id)

  if (task) {
    logger.info('Get Task Data Success')
    return res.status(200).send({
      message: 'Tasks',
      status: true,
      statusCode: 200,
      statusText: 'OK',
      data: task
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
}

const createTask = async (req: Request, res: Response) => {
  try {
    const data = req.body
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
  const id = req.params.id as string
  const data = req.body

  try {
    await updateTaskById(id, data)

    logger.info('Update Task Success')
    res.status(200).send({
      message: 'Tasks',
      status: true,
      statusCode: 200,
      statusText: 'Update Task Successfully'
    })
  } catch (error) {
    logger.error(`Update Task Failed: ${error}`)
    res.status(500).send({
      message: 'Tasks',
      status: false,
      statusCode: 500,
      statusText: 'Internal Server Error'
    })
  }
}

const deleteTask = async (req: Request, res: Response) => {
  const id = req.params.id as string

  try {
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

export { getTasks, getTaskByIdHandler, createTask, updateTask, deleteTask }
