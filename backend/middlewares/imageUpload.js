import path from "path"
import multer from "multer"

// destination to storage image
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = ""

    if (req.baseUrl.includes("users")) {
      folder = "users"
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos"
    }

    cb(null, `images/${folder}`)
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        Math.floor(Math.random() * 100) +
        path.extname(file.originalname)
    )
  }
})

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Por favor, apenas png ou jpg."))
    }
    cb(undefined, true)
  }
})

export default imageUpload
