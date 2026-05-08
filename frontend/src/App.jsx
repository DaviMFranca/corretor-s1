import { Routes, Route } from "react-router-dom"

import Home from "./Home"
import Admin from "./Admin"
import Details from "./Details"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  )
}

export default App