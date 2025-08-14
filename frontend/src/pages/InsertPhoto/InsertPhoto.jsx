// CSS
import "./InsertPhoto.css"

// HOOKS
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// SLICE FUNC
import { insertPhoto, resetMessage } from "../../slices/photoSlice"

// COMPONENTS
import Message from "../../components/Message/Message"

// RESPONSIVE
import { useMediaQuery } from "react-responsive"

const InsertPhoto = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState(null)

  const { user } = useSelector(state => state.auth)
  const { error } = useSelector(state => state.photo)
  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddPhoto = async e => {
    e.preventDefault()

    const photoData = {
      title,
      image
    }

    const formData = new FormData()

    Object.keys(photoData).forEach(key => {
      formData.append(key, photoData[key])
    })

    try {
      await dispatch(insertPhoto(formData)).unwrap()

      setTimeout(() => {
        dispatch(resetMessage())
      }, 3000)

      navigate(`/dashboard/${user.id}`)
    } catch (err) {
        setTimeout(() => {
          dispatch(resetMessage())
        },  3000)
    }
  }

  return (
    <main>
      {error && <Message msg={error} type="error" />}

      <div className={isMobile ? "mobile_insertphoto" : "desktop_insertphoto"}>
        <h2>Adicionar foto</h2>

        {image && <img src={image && URL.createObjectURL(image)} alt="" />}

        <form onSubmit={handleAddPhoto}>
          <label>
            <span>Título: </span>
            <input
              type="text"
              name="title"
              onChange={e => setTitle(e.target.value)}
              value={title}
              placeholder="Digite o título"
            />
          </label>

          <label>
            <span>Foto: </span>
            <input
              type="file"
              name="image"
              onChange={e => setImage(e.target.files[0])}
            />
          </label>

          <input type="submit" value="Adicionar foto" />
        </form>
      </div>
    </main>
  )
}

export default InsertPhoto
