import mongoose, { Schema } from "mongoose"

const userShema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String
  },
  {
    timestamps: true
  }
)

const User = mongoose.model("User", userShema)

export default User
