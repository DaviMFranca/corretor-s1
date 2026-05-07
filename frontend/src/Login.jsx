import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {

  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = () => {

    if (password === "123456") {

      localStorage.setItem("admin", "true")

      navigate("/admin")

    } else {

      alert("Senha incorreta")

    }
  }

  return (
    <div className="login-page">

      <div className="login-box">

        <h2>🔐 Área Administrativa</h2>

        <input
          type="password"
          placeholder="Digite a senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Entrar
        </button>

      </div>

    </div>
  )
}

export default Login