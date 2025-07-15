import express from "express"
import cors from "cors"

// ROUTES
import userRouter from "./routes/UserRoutes.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// ROUTES
app.use("/users", userRouter)

// DB
import "./config/db.js"

app.listen(PORT, () => console.log(`serve running on ${PORT}`))
