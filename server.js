const express = require("express")
const path = require("path")
const nodemailer = require("nodemailer")
const bodyParser = require("body-parser")
require("dotenv").config()

const app = express()
const PORT = 3000

// Middleware za parsiranje podataka iz forme
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// POST ruta za primanje podataka iz forme
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body

  // Podešavanje SMTP transporta za Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Postavi svoj e-mail
      pass: process.env.EMAIL_PASS, // Postavi lozinku (ili generiši App Password)
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER, // Tvoj e-mail
    to: "dinol2002@proton.me, hidajeta.lukac@gmail.com", // Primaoc (možeš staviti bilo koji e-mail)
    subject: `Nova poruka od ${name}`,
    text: `Ime: ${name}\nE-mail: ${email}\nPoruka:\n${message}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.send("E-mail uspješno poslan!")
  } catch (error) {
    console.error("Greška prilikom slanja e-maila:", error)
    res.status(500).send("Došlo je do greške prilikom slanja e-maila.")
  }
})

// Pokreni server
app.listen(PORT, () => {
  console.log(`Server pokrenut na http://localhost:${PORT}`)
})
