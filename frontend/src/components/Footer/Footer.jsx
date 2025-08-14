// CSS
import "./Footer.css"

// RESPONSIVE
import { useMediaQuery } from "react-responsive"

// HOOKS
import useAuth from "../../hooks/useAuth"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// ROUTES
import { NavLink } from "react-router-dom"

// ICONS
import { FaUser, FaHome } from "react-icons/fa"
import { MdAddAPhoto } from "react-icons/md"

// SLICE FUNCTIONS
import { logout, reset } from "../../slices/authSlice"

const urlPage = "https://github.com/eujoao-maciel/GruDee"

const Footer = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" })

  const { user } = useSelector(state => state.auth)

  const { auth } = useAuth()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())

    navigate("/login")
  }

  return isMobile ? (
    <>
      <nav className="footer_nav">
        <ul className="list">
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
  ) : (
    <>
      <div className="desktop_footer">
        <p>GruDee &copy; 2025</p>
      </div>
    </>
  )
}

export default Footer
