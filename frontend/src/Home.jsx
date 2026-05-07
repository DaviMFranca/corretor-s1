import { useEffect, useState } from "react"
import axios from "axios"
import Map from "./Map"

function Home() {

  const [properties, setProperties] = useState([])

  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")

  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {

    axios.get("https://corretor-backend.onrender.com/properties")
      .then(res => setProperties(res.data))

  }, [])

  useEffect(() => {

    if (darkMode) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }

  }, [darkMode])

  return (
    <div>

      {/* NAVBAR */}

      <header className="topbar">

        <div className="logo">
          🏠 Corretor São Luís
        </div>

        <nav>

          <a href="/">Início</a>
          <a href="/">Imóveis</a>
          <a href="/">Contato</a>

          <a href="/login" className="admin-btn">
            Admin
          </a>

          <button
  className="dark-btn"
  onClick={() => setDarkMode(!darkMode)}
>

  {darkMode ? "☀️ Light" : "🌙 Dark"}

</button>

        </nav>

      </header>

      {/* HERO */}

      <section className="hero">

        <div className="hero-overlay">

          <div className="hero-box">

            <span className="badge">
              🔥 Imóveis Premium em São Luís
            </span>

            <h1>
              Encontre o imóvel perfeito para sua família
            </h1>

            <p>
              Casas, apartamentos e terrenos nos melhores bairros da cidade.
            </p>

            <div className="search-box">

              <input
                type="text"
                  placeholder="Buscar imóvel..."
                    value={search}
                      onChange={(e) => setSearch(e.target.value)}
                         />

                  <select
                       value={typeFilter}
                         onChange={(e) => setTypeFilter(e.target.value)}
                             >

                         <option value="">
                      Todos
                   </option>

             <option value="Venda">
           Venda
                 </option>

                  <option value="Aluguel">
                      Aluguel
                      </option>

                        </select>

              <button>
                Buscar
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* GRID */}

      <div style={{ padding: "40px" }}>

  <Map properties={properties} />

</div>
      <div className="container">

        <div className="grid">

          {properties
                 .filter(p => {

                     const matchesSearch =
                          p.title.toLowerCase().includes(search.toLowerCase()) ||
                         p.location.toLowerCase().includes(search.toLowerCase())

                          const matchesType =
                         typeFilter === "" || p.type === typeFilter

         return matchesSearch && matchesType
  })

  .map(p => (

            <div key={p.id} className="card">

              <img src={p.image} />

              <div className="card-content">

                <h3>{p.title}</h3>

                <p>{p.location}</p>

                <p>
                  {p.description}
                </p>

                <strong>
                  {p.price}
                </strong>

                <a
                  href={`https://wa.me/5598970079639?text=Olá tenho interesse em ${p.title}`}
                  target="_blank"
                  className="btn"
                >
                  WhatsApp
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* FOOTER */}

      <footer className="footer">

        <h3>🏠 Corretor São Luís</h3>

        <p>
          Plataforma moderna de imóveis em São Luís.
        </p>

      </footer>

    </div>
  )
}

export default Home