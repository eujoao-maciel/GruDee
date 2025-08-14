// CSS
import "./EditUser.css"

import { images } from "../../utils/config"

// RESPONSIVE
import { useMediaQuery } from "react-responsive"

// HOOKS
import { useDispatch, useSelector } from "react-redux"

// COMPONENTS
import Message from "../../components/Message/Message"

// SLICE FUNCITONS
import {
  getCurrentUser,
  updateUser,
  resetMessage
} from "../../slices/userSlice"
import { useEffect, useState } from "react"

const EditUser = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" })

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [previewImage, setPreviewImage] = useState("")

  const dispatch = useDispatch()

  const { user, message, error } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [user, dispatch])

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setBio(user.bio)
    }
  }, [user])

  const handleSubmit = async e => {
    e.preventDefault()

    const userData = {}

    if (name) {
      userData.name = name
    }

    if (email) {
      userData.email = email
    }

    if (password) {
      userData.password = password
    }

    if (confirmpassword) {
      userData.confirmpassword = confirmpassword
    }

    if (bio) {
      userData.bio = bio
    }

    if (profileImage) {
      userData.image = profileImage
    }

    const formData = new FormData()

    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key])
    })

    await dispatch(updateUser(formData))

    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000)
  }

  const handleFile = e => {
    const image = e.target.files[0]

    setPreviewImage(image)
    setProfileImage(image)
  }

  return (
    <div className={isMobile ? "mobile_edit_user" : "desktop_edit_user"}>
      <main className="edit_user_container">
        {(user.profileImage || previewImage) && (
          <div className="header_user_edit">
            <img
              src={
                previewImage
                  ? URL.createObjectURL(previewImage)
                  : `${images}/users/${user.profileImage}`
              }
              alt={user.name}
            />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>
            <span>Foto de perfil (png) | (jpg): </span>
            <input type="file" onChange={handleFile} />
          </label>

          <label>
            <span>Nome: </span>
            <input
              type="text"
              name="name"
              placeholder="nome"
              onChange={e => setName(e.target.value)}
              value={name || ""}
            />
          </label>

          <label>
            <span>Bio: </span>
            <input
              type="text"
              name="bio"
              placeholder="bio"
              onChange={e => setBio(e.target.value)}
              value={bio || ""}
            />
          </label>

          <label>
            <span>E-mail: </span>
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={e => setEmail(e.target.value)}
              value={email || ""}
            />
          </label>

          <label>
            <span>Senha: </span>
            <input
              type="password"
              name="password"
              placeholder="senha"
              onChange={e => setPassword(e.target.value)}
            />
          </label>

          <label>
            <span>Confirmação de senha: </span>
            <input
              type="password"
              name="confirmpassword"
              placeholder="confirmação de senha"
              onChange={e => setConfirmpassword(e.target.value)}
            />
          </label>

          <input type="submit" value="Editar" />

          {message && <Message msg={message} type="success" />}
          {error && <Message msg={error} type="error" />}
        </form>
      </main>
    </div>
  )
}

export default EditUser
