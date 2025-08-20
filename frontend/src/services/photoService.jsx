import { api, requestConfig } from "../utils/config"

const getUserPhotos = async id => {
  const config = requestConfig("GET", null)

  try {
    const res = await fetch(api + "photos/userphotos/" + id, config)
    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)
  }
}

const getPhotoById = async (id, token) => {
  const config = requestConfig("GET", null, token)

  try {
    const res = await fetch(api + "photos/" + id, config)
    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)
  }
}

const likePhoto = async (id, token) => {
  const config = requestConfig("PUT", null, token)

  try {
    const res = await fetch(api + "photos/like/" + id, config)
    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)
  }
}

const deletePhoto = async (id, token) => {
  const config = requestConfig("DELETE", null, token)

  try {
    const res = await fetch(api + "photos/delete/" + id, config)
    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)
  }
}

const editPhoto = async (data, id, token) => {
  const config = requestConfig("PUT", data, token)

  try {
    const res = await fetch(api + "photos/" + id, config)
    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)
  }
}

const addComment = async (data, id, token) => {
  const config = requestConfig("PUT", data, token)

  try {
    const res = await fetch(api + "photos/comment/" + id, config)
    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)
  }
}

const insertPhoto = async (data, token) => {
  const config = requestConfig("POST", data, token, true)

  try {
    const res = await fetch(api + "photos/insertphoto", config)
    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)
  }
}

const getAllPhotos = async() => {
  const config = requestConfig("GET", null)

  try {
    const res = await fetch(api + "photos/", config)
    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)
  }
}

const photoServices = {
  getUserPhotos,
  getPhotoById,
  likePhoto,
  deletePhoto,
  editPhoto,
  addComment,
  insertPhoto,
  getAllPhotos
}

export default photoServices
