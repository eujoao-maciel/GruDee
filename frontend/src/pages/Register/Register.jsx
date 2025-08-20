// CSS
import "./Register.css"

// HOOKS
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

// RESPONSIVE
import { useMediaQuery } from "react-responsive"

// ROUTES
import { NavLink } from "react-router-dom"

// SLICE FUNC
import { register } from "../../slices/authSlice"

// COMPONENTS
import Message from "../../components/Message/Message"

const Register = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" })

  const { loading, error } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      name,
      email,
      password,
      confirmpassword
    }

    dispatch(register(user))
  }

  return (
    <div className={isMobile ? "mobile_register" : "desktop_register"}>
      <h1>Cadastrar</h1>

      <p>Realize o cadastro para sincronizar com os seus grudes</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome: </span>
          <input
            type="text"
            name="name"
            placeholder="Digite o seu nome"
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </label>

        <label>
          <span>E-mail: </span>
          <input
            type="email"
            name="email"
            placeholder="Digite o seu e-mail"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <label>
          <span>Senha: </span>
          <input
            type="password"
            name="password"
            placeholder="Digite a sua senha"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </label>

        <label>
          <span>Confirmação de senha: </span>
          <input
            type="password"
            name="confirmpassword"
            placeholder="Digite a sua senha novamente"
            onChange={e => setConfirmpassword(e.target.value)}
            value={confirmpassword}
          />
        </label>

        {!loading && <input  type="submit" value="Cadastrar"/>}
        {loading && <input  type="submit" disabled value="Aguarde..."/>}
        
        { error && <Message msg={error} type="error"/> }
      </form>

      <p>
        Já possui uma conta? <NavLink to="/login">faça o login</NavLink>
      </p>
    </div>
  )
}

export default Register
