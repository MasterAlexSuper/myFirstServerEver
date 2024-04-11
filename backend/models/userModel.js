import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      username: {
         required: true,
         type: String,
      },
      password: {
         required: true,
         type: String,
      },
      fullname: {
         type: String
      },
      email: {
         type: String
      }
   },
   {
      timestamps: true
   }
)

export const User = mongoose.model('User', userSchema)