const express = require('express')
const router = express.Router()
const restaurant = require('./modules/restaurant')
const home = require('./modules/home')
router.use('/restaurants', restaurant)
router.use('/', home)
module.exports = router