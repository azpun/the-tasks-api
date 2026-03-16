import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    user_id: {
      unique: true,
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    }
  },
  { timestamps: true }
)

const userModel = mongoose.model('users', userSchema)

export default userModel
