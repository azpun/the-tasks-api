import mongoose from 'mongoose'

// membuat schema data (rancangan data)
const taskSchema = new mongoose.Schema(
  {
    task_id: {
      type: String,
      unique: true
    },
    task: {
      type: String
    },
    description: {
      type: String
    },
    priority: {
      type: String
    },
    isDone: {
      type: Boolean
    }
  },
  { timestamps: true } // auto generate 'createAt' dan 'updateAt'
)

// membuat model data dari schema data
const taskModel = mongoose.model('tasks', taskSchema)

export default taskModel
