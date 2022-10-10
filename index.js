const express = require('express')
const mongoose = require('mongoose')
const DB_URL = process.env.PORT || 'mongodb://localhost:27017/blogsApp'
const PORT = process.env.PORT || 5000

const authMiddleware = require('./middlewares/auth')

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use(express.static('./public'))

//loogedIn middleware

//Handle Error Middleware

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) return console.log("Success")
    console.log("Error connect to Server")
})

app.listen(PORT, (err) => {

    (!err) ? console.log("Server start at PORT", PORT) : console.log(err)

})
