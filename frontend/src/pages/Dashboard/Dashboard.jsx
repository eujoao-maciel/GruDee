// CSS
import "./Dashboard.css"

import { images } from "../../utils/config"

// RESPONSIVE
import { useMediaQuery } from "react-responsive"

// ROUTE
import { NavLink } from "react-router-dom"

// HOOKS
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"

// SLICE FUNCTION
import { getUserPhotos } from "../../slices/photoSlice"
import { getUserById } from "../../slices/userSlice"

const Dashboard = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" })

  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const { id } = params

  const { photos } = useSelector(state => state.photo)
  const temporaryUser = useSelector(state => state.user.user)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getUserPhotos(id))
  }, [id, dispatch])

  useEffect(() => {
    dispatch(getUserById(id))
  }, [id])

  const handleLoadPhotoPage = id => {
    navigate(`/photo/${id}`)
  }

  return (
    <div className={isMobile ? "mobile_dashboard" : "desktop_dashboard"}>
      {photos?.length > 0 ? (
        <>
          <div className="photos_container">
            {photos ? (
              photos.map(photo => (
                <img
                  key={photo._id}
                  src={`${images}/photos/${photo.image}`}
                  alt={photo.title}
                  onClick={() => handleLoadPhotoPage(photo._id)}
                />
              ))
            ) : (
              <p>Usuário não tem fotos</p>
            )}
          </div>

          {user && (
            <div className="btn_container">
              {user?.id === temporaryUser?._id && (
                <NavLink className="black-btn bold" to="/insertphoto">
                  Adicionar foto
                </NavLink>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          {user && (
            <div className="btn_container">
              {temporaryUser && user?.id === temporaryUser._id ? (
                <NavLink className="black-btn bold" to="/insertphoto">
                  Adicionar foto
                </NavLink>
              ) : (
                <p>O usuário não possui fotos</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Dashboard
