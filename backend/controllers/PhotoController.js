// MODEL
import Photo from "../models/Photo.js"
import User from "../models/User.js"

// list all photos
export const getAllPhotos = async (req, res) => {
  const photos = await Photo.find()

  res.json({ photos })
}

// upload a new photo
export const insertPhoto = async (req, res) => {
  const { title } = req.body
  let image

  if (req.file) {
    image = req.file.filename
  } else {
    res.status(400).json({ message: "A imagem é obrigatória." })
    return
  }

  const userReq = req.user
  const user = await User.findById(userReq._id).select("-password")

  // validations
  if (!title) {
    res.status(400).json({ message: "O título é obrigatório." })
    return
  }

  const newPhoto = await Photo.create({
    title,
    image,
    userId: user._id,
    userName: user.name
  })

  if (!newPhoto) {
    res
      .status(500)
      .json({ message: "Houve um erro, tente novamente mais tarde." })
    return
  }

  res.status(200).json({ newPhoto })
}

// return photo by ID
export const getPhotoById = async (req, res) => {
  try {
    const { id } = req.params

    const photo = await Photo.findById(id)

    if (!photo) {
      res.status(404).json({ message: "Foto não encontrada." })
      return
    }

    res.status(200).json(photo)
  } catch (err) {
    res.status(404).json({ message: "Foto não encontrada." })
    return
  }
}

// return all photos from the logged-in user
export const getUserPhotos = async (req, res) => {
  const reqUser = req.user

  const userPhotos = await Photo.find({ userId: reqUser._id }, {})

  res.status(200).json({ photos: userPhotos })
}

// update photo data (title or image)
export const updatePhoto = async (req, res) => {
  try {
    const { id } = req.params

    const { title } = req.body
    let image

    if (req.file) {
      image = req.file.filename
    }

    const user = req.user

    const photo = await Photo.findById(id)

    // authorization: ensure the logged-in user owns the photo
    if (photo.userId.toString() !== user._id.toString()) {
      res
        .status(400)
        .json({ message: "Houve um erro, tente novamente mais tarde." })
      return
    }

    if (title) {
      photo.title = title
    }

    if (image) {
      photo.image = image
    }

    await photo.save()

    res
      .status(200)
      .json({ message: "Foto atualizada com sucesso.", photo: photo })
  } catch (err) {
    res.status(422).json({ message: "Foto não encontrada." })
    return
  }
}

// like a photo if not already liked
export const likePhoto = async (req, res) => {
  try {
    const { id } = req.params

    const user = req.user

    const photo = await Photo.findById(id)

    if (photo.likes.includes(user._id)) {
      res.status(400).json({ message: "Você já curtiu essa foto." })
      return
    }

    photo.likes.push(user._id)

    await photo.save()

    res.status(200).json({
      message: "Foto curtida com sucesso.",
      id: photo._id,
      userId: user._id
    })
  } catch (err) {
    res.status(422).json({ message: "Foto não encontrada." })
    return
  }
}

// add comment to a photo
export const commentPhoto = async (req, res) => {
  try {
    const { id } = req.params
    const { comment } = req.body

    const user = req.user

    const photo = await Photo.findById(id)

    // validations
    if (!comment) {
      res.status(400).json({ message: "O campo de comentário é obrigatório." })
      return
    }

    const userComment = {
      comment,
      userName: user.name,
      userImage: user.profileImage,
      userId: user._id
    }

    photo.comments.push(userComment)

    await photo.save()

    res
      .status(200)
      .json({ message: "Comentário adicionado com sucesso.", userComment })
  } catch (err) {
    res.status(400).json({ message: "Foto não encontrada." })
    return
  }
}

// search photos by title (case insensitive)
export const searchPhotoByTitle = async (req, res) => {
  const { q } = req.query

  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec()

  if (photos.length < 1) {
    res.status(400).json({ message: "Nenhuma foto encontrada." })
    return
  }

  res.status(200).json(photos)
}

// delete photo if owned by the user
export const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params

    const user = req.user

    const photo = await Photo.findById(id)

    if (!photo) {
    }

    if (photo.userId.toString() !== user._id.toString()) {
      res
        .status(400)
        .json({ message: "Houve um erro, tente novamente mais tarde." })
      return
    }

    await Photo.findByIdAndDelete(id)

    res
      .status(200)
      .json({ message: "Foto apagada com sucesso.", id: photo._id })
  } catch (err) {
    res.status(422).json({ message: "Foto não encontrada." })
    return
  }
}
