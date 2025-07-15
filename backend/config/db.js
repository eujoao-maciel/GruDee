import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI)

    console.log("Connect on mongo")

    return db
  } catch (error) {
    console.log(error)
  }
}

connectDB()

export default connectDB
