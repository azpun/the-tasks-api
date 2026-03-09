import mongoose from "mongoose";
import config from "../config/environtment.ts";
import { logger } from "./logger.ts";

mongoose.connect(`${config.db}`).then(() => {
    logger.info('Connected to MongoDB')
}).catch(error => {
    logger.info('Could not connect to DB')
    logger.error(error)
    process.exit(1)
})