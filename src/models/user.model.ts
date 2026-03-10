import mongoose from "mongoose";
import { string } from "zod";

const userSchema = new mongoose.Schema(
    {
        user_id:{
            unique: true,
            type: string
        },
        email:{
            type:string
        },
        password:{
            type:string
        },   
    },
    {timestamps: true}
)

const userModel = mongoose.model('users', userSchema)

export default userModel