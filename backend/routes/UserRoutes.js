import { Router } from "express"

// CONTROLLERS
import {
  create,
  getCurrentUser,
  getUserById,
  login,
  updateUser
} from "../controllers/UserController.js"

// MIDDLEWARE
import checkUser from "../middlewares/checkAuth.js"
import imageUpload from "../middlewares/imageUpload.js"

const router = Router()
router.post("/create", create)
router.post("/login", login)
router.get("/profile", checkUser, getCurrentUser)
router.get("/:id", getUserById)
router.put("/edit/", checkUser, imageUpload.single("image"), updateUser)

export default router
