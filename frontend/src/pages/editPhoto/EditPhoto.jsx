// CSS
import "./EditPhoto.css"

import { images } from "../../utils/config"

// SLICE FUNCTIONS
import { editPhoto, getPhotoById, resetMessage } from "../../slices/photoSlice"

// HOOKS
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

// RESPONSIVE
import { useMediaQuery } from "react-responsive"

// COMPONENTS
import Message from "../../components/Message/Message"

const EditPhoto = () => {
  const [title, setTitle] = useState("")

  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" })

  const { photo, error } = useSelector(state => state.photo)

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = params

  const handleUpdatePhoto = async e => {
    e.preventDefault()

    const photoData = {
      title,
      id
    }

    dispatch(editPhoto(photoData))
    
    navigate(`/photo/${id}`)

    setTimeout(() => {
      dispatch(resetMessage())
    }, 3000)
  }

  useEffect(() => {
    dispatch(getPhotoById(id))
  }, [id])

  useEffect(() => {
    if (photo && photo.title) {
      setTitle(photo.title)
    }
  }, [photo])

  return (
    <div className={isMobile ? "mobile_edit_photo" : "desktop_edit_photo"}>
      {photo && photo.image && (
        <img src={`${images}/photos/${photo.image}`} alt={photo.title} />
      )}

      <form onSubmit={handleUpdatePhoto}>
        <label>
          <span>Título: </span>
          <input
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <input type="submit" value="Editar" />
      </form>
    </div>
  )
}

export default EditPhoto
