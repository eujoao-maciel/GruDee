import express from "express"
import cors from "cors"

// ROUTES
import userRouter from "./routes/UserRoutes.js"
import photoRouter from "./routes/PhotoRoutes.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// ROUTES
app.use("/users", userRouter)
app.use("/photos", photoRouter)

// DB
import "./config/db.js"

app.listen(PORT, () => console.log(`serve running on ${PORT}`))
