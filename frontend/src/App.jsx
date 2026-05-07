import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import Details from "./Details"
import Admin from "./Admin"
import Login from "./Login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/imovel/:id" element={<Details />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App