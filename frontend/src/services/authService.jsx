import { api, requestConfig } from "../utils/config"

// sign in a user
const login = async data => {
  const config = requestConfig("POST", data)

  try {
    const res = await fetch(api + "users/login", config)
    const data = await res.json()

    if (!data.error) {
      localStorage.setItem("user", JSON.stringify(data))
    }

    return data
  } catch (err) {
    console.log(err)
  }
}

// logout a user
const logout = async () => {
  localStorage.removeItem("user")
}

// register a user
const register = async data => {
  const config = requestConfig("POST", data)

  try {
    const res = await fetch(api + "users/create", config)
    const data = await res.json()

    if (!data.error) {
      localStorage.setItem("user", JSON.stringify(data))
    }

    return data
  } catch (err) {
    console.log(err)
  }
}

const authService = {
  login,
  logout,
  register
}

export default authService
