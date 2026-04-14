import { type Request, type Response } from 'express'
import { logger } from '../utils/logger.js'
import { addTasksDB, deleteTaskById, getTaskById, getTasksDB, updateTaskById } from '../services/task.service.js'

const getTasks = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tasks: any = await getTasksDB()
    logger.info('Get Tasks Data Success')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Tasks found successfully',
      data: tasks
    })
  } catch (error) {
    logger.error('Get Tasks Data Failed')
    res.status(500).send({
      status: false,
      statusCode: 500,
      statusText: 'Internal Server Error',
      message: 'Get Tasks Data Failed',
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
      status: true,
      statusCode: 200,
      message: 'Get task successfully',
      data: task
    })
  } else {
    logger.info('Get Task Data Failed')
    return res.status(404).send({
      status: true,
      statusCode: 404,
      message: 'Data Not Found',
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
      status: true,
      statusCode: 201,
      message: 'Task created successfully'
    })
  } catch (error) {
    logger.error(`Add New Task Failed: ${error}`)
    res.status(500).send({
      status: false,
      statusCode: 500,
      statusText: 'Internal Server Error',
      message: 'Failed to create task'
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
      status: true,
      statusCode: 200,
      message: 'update task successfully'
    })
  } catch (error) {
    logger.error(`Update Task Failed: ${error}`)
    res.status(500).send({
      status: false,
      statusCode: 500,
      statusText: 'Internal Server Error',
      message: 'Failed to update task',
      data: error
    })
  }
}

const deleteTask = async (req: Request, res: Response) => {
  const id = req.params.id as string

  try {
    await deleteTaskById(id)

    logger.info('Delete Task Success')
    res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Task deleted successfully',
      data: null
    })
  } catch (error) {
    logger.error(`Delete Task Failed: ${error}`)
    res.status(500).send({
      status: false,
      statusCode: 500,
      statusText: 'Internal Server Error',
      message: 'Failed to delete task',
      data: error
    })
  }
}

export { getTasks, getTaskByIdHandler, createTask, updateTask, deleteTask }
