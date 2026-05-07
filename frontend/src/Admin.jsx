import { Navigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

function Admin() {
  const isAdmin = localStorage.getItem("admin")

if (!isAdmin) {
  return <Navigate to="/login" />
}
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    type: "",
    description: ""
  })

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()

for (let key in form) {
  data.append(key, form[key])
}

data.append("image", image)

    await axios.post("https://corretor-backend.onrender.com/properties", data)

    alert("Imóvel cadastrado!")
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cadastrar Imóvel</h2>

      <form onSubmit={handleSubmit}>

        <input name="title" placeholder="Título" onChange={handleChange} />
        <input name="location" placeholder="Localização" onChange={handleChange} />
        <input name="price" placeholder="Preço" onChange={handleChange} />

        <select name="type" onChange={handleChange}>
          <option value="">Tipo</option>
          <option value="Venda">Venda</option>
          <option value="Aluguel">Aluguel</option>
        </select><br />

        <textarea name="description" placeholder="Descrição" onChange={handleChange} /><br />

        {/* 🔥 AQUI É O MAIS IMPORTANTE */}
        <input
  type="file"
  onChange={(e) => {
    const file = e.target.files[0]
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }}
/>

{preview && (
  <img
    src={preview}
    style={{ width: "200px", marginTop: "10px", borderRadius: "10px" }}
  />
)}

        <button type="submit">Salvar</button>

      </form>
    </div>
  )
}

export default Admin