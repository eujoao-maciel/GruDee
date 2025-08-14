import { api, requestConfig } from "../utils/config"

// get user by id
const getUserById = async id => {
  const config = requestConfig("GET", null)

  try {
    const res = await fetch(api + "users/" + id, config)
    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)
  }
}

// get user by token
const getCurrentUser = async token => {
  const config = requestConfig("GET", null, token)

  try {
    const res = await fetch(api + "users/profile", config)
    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)
  }
}

// update a user
const updateUser = async (data, token) => {
  const config = requestConfig("PUT", data, token, true)

  try {
    const res = await fetch(api + "users/edit/", config)
    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)
  }
}

const userService = {
  getUserById,
  getCurrentUser,
  updateUser
}

export default userService
