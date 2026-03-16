import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    user_id: {
      unique: true,
      type: String
    },
    email: {
      unique: true,
      type: String
    },
    name: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: 'user'
    }
  },
  { timestamps: true }
)

const userModel = mongoose.model('users', userSchema)

export default userModel
