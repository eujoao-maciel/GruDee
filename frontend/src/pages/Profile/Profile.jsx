// CSS
import "./Profile.css"

import { images } from "../../utils/config"

// RESPONSIVE
import { useMediaQuery } from "react-responsive"

// HOOKS
import { NavLink, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

// ICONS
import { MdPhotoLibrary } from "react-icons/md"

// SLICE FUNC
import { getUserById } from "../../slices/userSlice"

const Profile = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" })

  const { user: userAuth } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    dispatch(getUserById(id))
  }, [id])

  return (
    <div className={isMobile ? "mobile_profile" : "desktop_profile"}>
      {user && (
        <>
          <main className="profile">
            <NavLink to={`/dashboard/${id}`} className="open_dashboard">
              <MdPhotoLibrary />
            </NavLink>

            <div className="header">
              {user.profileImage && (
                <img
                  src={`${images}/users/${user.profileImage}`}
                  alt={user.name}
                />
              )}

              <h2 className="user_name">{user.name}</h2>
            </div>

            <div className="bio_container">
              <p>bio: {user.bio}</p>
            </div>

            {userAuth && (
              <>
                {user && user._id === userAuth?.id && (
                  <NavLink className="black-btn" to="/edit">
                    Editar
                  </NavLink>
                )}
              </>
            )}
          </main>
        </>
      )}
    </div>
  )
}

export default Profile
