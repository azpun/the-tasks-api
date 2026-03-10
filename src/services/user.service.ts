import userModel from "../models/user.model.ts";
import { logger } from "../utils/logger.ts";

const getUsersDB = async () => {
  return await userModel.find().then(data => {
    return data
  }).catch(err => {
    logger.info("Cannot get data from DB")
    logger.error(err)
  }) 
}

export {getUsersDB}