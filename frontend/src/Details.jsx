import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

function Details() {

  const { id } = useParams()
  const [property, setProperty] = useState(null)

  useEffect(() => {
    axios.get("https://corretor-backend.onrender.com/properties")
      .then(res => {
        const found = res.data.find(p => p.id == id)
        setProperty(found)
      })
  }, [])

  if (!property) return <p>Carregando...</p>

  return (
  <div className="details-container">

    <div className="details-card">

      <img 
        src={property.image} 
        className="details-image"
      />

      <div className="details-content">
        <h1>{property.title}</h1>
        <p className="location">{property.location}</p>

        <h2 className="price">{property.price}</h2>

        {/* NOVA PARTE - DESCRIÇÃO */}
        <div className="description">
          <h3>Detalhes do imóvel</h3>
          <p>
            Este imóvel está localizado em uma excelente região, ideal para morar
            com conforto e segurança. Possui ótimo acesso, boa valorização e é
            perfeito para quem busca qualidade de vida.
          </p>
        </div>

        <a
          href={`https://wa.me/5598970079639?text=Tenho interesse em ${property.title}`}
          target="_blank"
          className="btn"
        >
          Falar no WhatsApp
        </a>

      </div>

    </div>

  </div>
)
}

export default Details