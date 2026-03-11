import taskModel from '../models/task.model.ts'
import { logger } from '../utils/logger.ts'
import type { TaskValidation } from '../validations/task.validation.ts'

const getTasksDB = async () => {
  return await taskModel
    .find()
    .then((data) => {
      return data
    })
    .catch((err) => {
      logger.info('Cannot get data from DB')
      logger.error(err)
    })
}

const addTasksDB = async (payload: TaskValidation) => {
  return await taskModel.create(payload as Parameters<typeof taskModel.create>[0])
}

export { getTasksDB, addTasksDB }
