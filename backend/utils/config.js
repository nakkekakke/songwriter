require('dotenv').config()

let PORT = process.env.PORT
let MONGO_URL = process.env.MONGO_URL
let JWT_SECRET = process.env.JWT_SECRET

module.exports = { PORT, MONGO_URL, JWT_SECRET }