// CSS
import "./Login.css"

// RESPONSIVE
import { useMediaQuery } from "react-responsive"

// ROUTES
import { NavLink } from "react-router-dom"

// HOOKS
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

// SLICE
import { login, reset } from "../../slices/authSlice"

// COMPONENTS
import Message from "../../components/Message/Message"

const Login = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" })

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const { loading, error } = useSelector(state => state.auth)

  const handleSubmit = e => {
    e.preventDefault()

    const user = { email, password }

    dispatch(login(user))
  }

  // clean all auth states
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return isMobile ? (
    <>
      <div className="mobile_login">
        <h1>Entrar</h1>

        <p>Realize o login para sincronizar com os seus grudes</p>

        <form onSubmit={handleSubmit}>
          <label>
            <span>E-mail:</span>
            <input
              type="email"
              name="email"
              placeholder="Digite o seu e-mail"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </label>

          <label>
            <span>Senha:</span>
            <input
              type="password"
              name="password"
              placeholder="Digite a sua senha"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </label>

          {!loading && <input type="submit" value="Entrar" />}
          {loading && <input type="submit" disabled value="Aguarde..." />}

          {error && <Message msg={error} type="error" />}
        </form>

        <p>
          Não tem conta? <NavLink to="/register">Cadastre-se</NavLink>
        </p>
      </div>
    </>
  ) : (
    <>
      <div className="desktop_login">
        <h1>Entrar</h1>

        <p>Realize o login para sincronizar com os seus grudes</p>

        <form onSubmit={handleSubmit}>
          <label>
            <span>E-mail:</span>
            <input
              type="email"
              name="email"
              placeholder="Digite o seu e-mail"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </label>

          <label>
            <span>Senha:</span>
            <input
              type="password"
              name="password"
              placeholder="Digite a sua senha"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </label>

          {!loading && <input type="submit" value="Entrar" />}
          {loading && <input type="submit" disabled value="Aguarde..." />}

          {error && <Message msg={error} type="error" />}
        </form>

        <p>
          Não tem conta? <NavLink to="/register">Cadastre-se</NavLink>
        </p>
      </div>
    </>
  )
}

export default Login
