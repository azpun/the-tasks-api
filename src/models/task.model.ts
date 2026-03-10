import mongoose from 'mongoose'
import { boolean, string } from 'zod'

// membuat schema data (rancangan data)
const taskSchema = new mongoose.Schema(
  {
    task_id: {
      type: string,
      unique: true
    },
    task: {
      type: string
    },
    description: {
      type: string
    },
    priority: {
      type: string
    },
    isDone: {
      type: boolean
    }
  },
  { timestamps: true } // auto generate 'createAt' dan 'updateAt'
)

// membuat model data dari schema data
const taskModel = mongoose.model('tasks', taskSchema)

export default taskModel
