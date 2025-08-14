// CSS
import "./NavBar.css"

// RESPONSIVE
import { useMediaQuery } from "react-responsive"

// HOOKS
import useAuth from "../../hooks/useAuth"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// SLICE
import { logout, reset } from "../../slices/authSlice"

// ROUTE
import { NavLink } from "react-router-dom"

// ICONS
import { FaUser, FaHome } from "react-icons/fa"
import { MdAddAPhoto } from "react-icons/md"

const urlPage = "https://github.com/eujoao-maciel/GruDee"

const NavBar = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" })

  const { auth } = useAuth()
  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())

    navigate("/login")
  }

  return isMobile ? (
    <>
      <div className="mobilenav bold">
        <h1>GruDee</h1>
      </div>
    </>
  ) : (
    <>
      <nav className="desktopnav bold">
        <NavLink className="title" to="/">
          GruDee
        </NavLink>

        <ul className="nav_links">
          {auth ? (
            <>
              <li className="item">
                <NavLink to="/">
                  <FaHome />
                </NavLink>
              </li>

              {user && (
                <li className="item">
                  <NavLink to={`/dashboard/${user.id}`}>
                    <MdAddAPhoto />
                  </NavLink>
                </li>
              )}

              {user && (
                <li className="item">
                  <NavLink to={`/users/${user.id}`}>
                    <FaUser />
                  </NavLink>
                </li>
              )}

              <li className="item">
                <NavLink onClick={handleLogout}>Sair</NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="item">
                <NavLink to="/login">Entrar</NavLink>
              </li>

              <li className="item">
                <NavLink to="/register">Cadastrar</NavLink>
              </li>

              <li className="item">
                <NavLink to={urlPage}>Sobre</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  )
}

export default NavBar
