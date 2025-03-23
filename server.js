const express = require("express")
const path = require("path")
const nodemailer = require("nodemailer")
const bodyParser = require("body-parser")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

// 1. Serve static files from /public
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// 2. Ručno definiši putanje ka HTML fajlovima
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get("/materijali.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "materijali.html"))
})

app.get("/kvizovi.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "kvizovi.html"))
})

app.get("/kontakt.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "kontakt.html"))
})

// 3. Email slanje
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "dinol2002@proton.me, hidajeta.lukac@gmail.com",
    subject: `Nova poruka od ${name}`,
    text: `Ime: ${name}\nE-mail: ${email}\nPoruka:\n${message}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).end() // Ne šaljemo nikakav tekst natrag ako ga ne želiš
  } catch (error) {
    console.error("Greška prilikom slanja e-maila:", error)
    res.status(500).send("Došlo je do greške prilikom slanja e-maila.")
  }
})

// 4. Pokretanje servera
app.listen(PORT, () => {
  console.log(`Server pokrenut na http://localhost:${PORT}`)
})
