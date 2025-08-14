// CSS
import "./Home.css"

// HOOKS
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

import { NavLink } from "react-router-dom"

// ICONS
import { BsPerson, BsHeart, BsHeartFill } from "react-icons/bs"

// SLICE FUNC
import { getAllPhotos, likePhoto, resetMessage } from "../../slices/photoSlice"

// RESPONSIVE
import { useMediaQuery } from "react-responsive"

// COMPONENTS
import PhotoItem from "../../components/PhotoItem/PhotoItem"
import LikeBtn from "../../components/LikeBtn/LikeBtn"

const Home = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" })

  const { photos } = useSelector(state => state.photo)
  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const allPhotos = photos

  useEffect(() => {
    dispatch(getAllPhotos())
  }, [dispatch])

  return (
    <div
      className={
        isMobile ? "mobile_photo_container" : "desktop_photo_container"
      }
    >
      {photos.length === 0 ? (
        <NavLink className="black-btn bold btn_container" to="/insertphoto">
          Adicionar foto
        </NavLink>
      ) : (
        <>
          {allPhotos &&
            allPhotos.length > 0 &&
            allPhotos.map(photoElement => (
              <div key={photoElement.title} className="photo_container">
                <PhotoItem photo={photoElement} />

                <div className="actions_btn">
                  <LikeBtn photo={photoElement} user={user && user} />

                  <NavLink
                    to={photoElement.userId && `users/${photoElement.userId}`}
                    className="user_icon"
                  >
                    <BsPerson /> {photoElement.userName}
                  </NavLink>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  )
}

export default Home
