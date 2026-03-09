import taskModel from "../models/task.model.ts";
import { logger } from "../utils/logger.ts";

const getTasksDB = async () => {
  return await taskModel.find().then(data => {
    return data
  }).catch(err => {
    logger.info("Cannot get data from DB")
    logger.error(err)
  })
}

export {getTasksDB}