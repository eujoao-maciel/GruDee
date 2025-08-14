// CSS
import "./App.css"

// HOOKS
import useAuth from "./hooks/useAuth"
import { useDispatch, useSelector } from "react-redux"

// Manages application routing, enabling navigation between different views/pages.
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

// PAGES
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Profile from "./pages/Profile/Profile"
import Dashboard from "./pages/Dashboard/Dashboard"
import EditUser from "./pages/EditUser/EditUser"
import Photo from "./pages/Photo/Photo"
import EditPhoto from "./pages/editPhoto/EditPhoto"
import InsertPhoto from "./pages/InsertPhoto/InsertPhoto"

// COMPONENTS
import NavBar from "./components/NavBar/NavBar"
import Footer from "./components/Footer/Footer"

function App() {
  const { auth, loading } = useAuth()

  const { user: temporaryUser } = useSelector(state => state.user)
  const { user } = useSelector(state => state.auth)

  let temporaryUserValue =
    temporaryUser && temporaryUser._id ? temporaryUser : null

  const isOwnProfile =
    auth &&
    user &&
    temporaryUserValue !== null &&
    temporaryUserValue._id === user.id

  if (loading) {
    return <p>Carregando</p>
  }

  return (
    <BrowserRouter>
      <NavBar />

      <div className="container">
        <Routes>
          <Route
            path="/"
            element={auth ? <Home /> : <Navigate to="/login" />}
          />

          <Route
            path="/users/:id"
            element={auth ? <Profile /> : <Navigate to="/login" />}
          />

          <Route
            path="/edit"
            element={
              !auth ? (
                <Navigate to="/login" />
              ) : isOwnProfile ? (
                <EditUser />
              ) : (
                user && <Navigate to={`/users/${user.id}`} />
              )
            }
          />

          <Route
            path="/dashboard/:id"
            element={auth ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/photo/:id"
            element={auth ? <Photo /> : <Navigate to="/login" />}
          />

          <Route
            path="/edit/:id"
            element={auth ? <EditPhoto /> : <Navigate to="/login" />}
          />

          <Route
            path="/insertphoto"
            element={auth ? <InsertPhoto /> : <Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  )
}

export default App
