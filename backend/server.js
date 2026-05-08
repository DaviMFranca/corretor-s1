const express = require("express")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const sqlite3 = require("sqlite3").verbose()

const app = express()

app.use(cors({
  origin: "https://corretor-s1.vercel.app"
}))

app.use(express.json())
app.use("/uploads", express.static("uploads"))

// CONFIG MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

// BANCO SQLITE
const db = new sqlite3.Database('./database.db')

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS properties (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      location TEXT,
      price TEXT,
      image TEXT,
      type TEXT,
      description TEXT
    )
  `)
})

// ROTAS
app.get('/', (req, res) => {
  res.send('Servidor funcionando')
})

app.get('/properties', (req, res) => {
  db.all('SELECT * FROM properties', [], (err, rows) => {
    if (err) return res.status(500).json(err)
    res.json(rows)
  })
})

// POST COM UPLOAD
app.post("/properties", upload.single("image"), (req, res) => {
  console.log("BODY:", req.body)
console.log("FILE:", req.file)

  const { title, location, price, type, description } = req.body

  const image = req.file
  ? `https://corretor-backend.onrender.com/uploads/${req.file.filename}`
  : ""

  db.run(
    `
    INSERT INTO properties
    (title, location, price, image, type, description)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [title, location, price, image, type, description],
    function (err) {

      if (err) {
        return res.status(500).json(err)
      }

      res.json({
        id: this.lastID,
        title,
        location,
        price,
        image,
        type,
        description
      })
    }
  )
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
