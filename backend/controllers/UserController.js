// MODEL
import User from "../models/User.js"

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const jwtSecret = process.env.MYSECRET

// VALIDATIONS
import validation from "../middlewares/validationsValues.js"

// helper: generate JWT
const generateToken = id => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d"
  })
}

// register a user
export const create = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body

  // required fields validation
  const values = [name, email, password, confirmpassword]
  const msgErros = [
    "O nome é obrigatório.",
    "O email é obrigatório.",
    "A senha é obrigaória",
    "A confirmação de senha é obrigatória."
  ]

  msgErros.map((msg, index) => validation(values[index], msgErros[index], res))

  // password confirmation
  if (password !== confirmpassword) {
    res.status(400).json({ error: "As senhas não conferem." })
    return
  }

  // check if user exists
  const user = await User.findOne({ email: email })

  if (user) {
    res.status(400).json({ error: "Este e-mail já está cadastrado." })
    return
  }

  // hash password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  try {
    const newUser = await User.create({
      name,
      email,
      password: passwordHash
    })

    res.status(201).json({
      id: newUser._id,
      token: generateToken(newUser._id)
    })
  } catch (err) {
    res.status(400).json({ message: err })
  }
}

// login a user
export const login = async (req, res) => {
  const { email, password } = req.body

  validation(email, "O e-mail é obrigatório.", res)
  validation(password, "A senha é obrigatória.", res)

  const user = await User.findOne({ email: email })

  //

  if (!user) {
    res.status(404).json({ error: "Usuário não encontrado" })
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) return res.status(401).json({ error: "Senha inválida." })

  //

  res.status(200).json({
    token: generateToken(user._id),
    id: user._id
  })
}

// get user by ID (used for profiles, etc.)
export const getUserById = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id).select("-password")

    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado." })
      return
    }

    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({ error: "Usuário não encontrado." })
    return
  }
}

// update user data
export const updateUser = async (req, res) => {
  const { name, email, password, confirmpassword, bio } = req.body

  const reqUser = req.user

  const user = await User.findById(reqUser.id).select("-password")
  let profileImage = ""

  if (req.file) {
    profileImage = req.file.filename
  }

  if (email) {
    const userByEmail = await User.find({ email: email })

    if (user.email !== email && userByEmail.length > 0) {
      res
        .status(500)
        .json({ error: "Este e-mail já esta vinculado a uma conta." })
      return
    }

    user.email = email
  }

  // check if password matchs
  if (password || confirmpassword) {
    validation(password, "A senha é obrigatória.", res)
    validation(confirmpassword, "A confirmação de senha é obrigatória.", res)

    if (password !== confirmpassword) {
      res.status(400).json({ error: "A senhas não são iguais." })
      return
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    user.password = passwordHash
  }

  if (name) {
    user.name = name
  }

  if (profileImage) {
    user.profileImage = profileImage
  }

  if (bio) {
    user.bio = bio
  }

  try {
    await user.save()

    res
      .status(200)
      .json({ user: user, message: "Usuário atualizado com sucesso." })
  } catch (err) {
    res
      .status(400)
      .json({ err, error: "Houve algum erro, tente novamente mais tarde." })
  }
}

// get currently authenticated user
export const getCurrentUser = async (req, res) => {
  const reqUser = req.user

  res.json(reqUser)
}
