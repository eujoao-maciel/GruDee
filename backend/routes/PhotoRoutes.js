import { Router } from "express"

// CONTROLLER
import {
  getAllPhotos,
  insertPhoto,
  getPhotoById,
  getUserPhotos,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotoByTitle,
  deletePhoto
} from "../controllers/PhotoController.js"

// MIDDLEWARE
import checkAuth from "../middlewares/checkAuth.js"
import imageUpload from "../middlewares/imageUpload.js"

const router = Router()
router.delete("/delete/:id", checkAuth, deletePhoto)
router.post("/insertphoto", checkAuth, imageUpload.single("image"), insertPhoto)
router.get("/userphotos/:id", getUserPhotos)
router.put("/like/:id", checkAuth, likePhoto)
router.put("/comment/:id", checkAuth, commentPhoto)
router.get("/search", checkAuth, searchPhotoByTitle)
router.get("/:id", checkAuth, getPhotoById)
router.put("/:id", checkAuth, imageUpload.single("image"), updatePhoto)
router.get("/", getAllPhotos)

export default router
