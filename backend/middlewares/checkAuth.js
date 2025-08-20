import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User.js"

dotenv.config()
const jwtSecret = process.env.MYSECRET

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization

  // check if token exists
  if (!authHeader) {
    res.status(401).json({ message: "Acesso negado, Token não encontrado." })
    return
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, jwtSecret)

    req.user = await User.findById( decoded.id ).select("-password")

    next()
  } catch (err) {
    return res.status(401).json({ message: "Acesso negado. Token inválido." })
  }
}


export default checkAuth