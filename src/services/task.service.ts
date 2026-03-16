import taskModel from '../models/task.model.ts'
import { logger } from '../utils/logger.ts'
import type { TaskValidation, TaskValidationPartial } from '../validations/task.validation.ts'

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

const getTaskById = async (id: string) => {
  return await taskModel
    .findOne({ task_id: id })
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

const updateTaskById = async (id: string, payload: TaskValidationPartial) => {
  return await taskModel
    .findOneAndUpdate({ task_id: id }, { $set: payload })
    .then((data) => {
      return data
    })
    .catch((err) => {
      logger.info('Cannot get data from DB')
      logger.error(err)
    })
}

const deleteTaskById = async (id: string) => {
  return await taskModel
    .findOneAndDelete({ task_id: id })
    .then((data) => {
      return data
    })
    .catch((err) => {
      logger.info('Cannot find data from DB to delete')
      logger.error(err)
    })
}

export { getTasksDB, addTasksDB, getTaskById, updateTaskById, deleteTaskById }
