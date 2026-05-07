import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

function Map({ properties }) {

  return (

    <MapContainer
      center={[-2.53, -44.30]}
      zoom={12}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "20px"
      }}
    >

      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {properties.map((p) => (

        <Marker
          key={p.id}
          position={[
            p.lat || -2.53,
            p.lng || -44.30
          ]}
        >

          <Popup>

            <strong>{p.title}</strong>

            <br />

            {p.price}

          </Popup>

        </Marker>

      ))}

    </MapContainer>
  )
}

export default Map