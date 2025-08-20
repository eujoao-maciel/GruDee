import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"

// ROUTES
import userRouter from "./routes/UserRoutes.js"
import photoRouter from "./routes/PhotoRoutes.js"

const app = express()
const PORT = 3000 || process.env.PORT

app.use(express.json())
app.use(cors())

// IMAGES DIRECTORY
const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

app.use("/images", express.static(path.join(_dirname, 'images')))

app.get("/", (req, res) => {
    res.json({ message: "server on" })
})

// ROUTES
app.use("/users", userRouter)
app.use("/photos", photoRouter)

// DB
import "./config/db.js"

app.listen(PORT, () => console.log(`serve running on ${PORT}`))
