const express = require('express')
const router = express.Router()

const {conn} = require('../config/dbConnect')

// conn.once("open", () => {})

module.exports = router