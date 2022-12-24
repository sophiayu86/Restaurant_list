const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurantSeed = require('./restaurant.json')// 載入 種子資料

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
db.once('open', () => {
  for (let i = 0; i < restaurantSeed.results.length; i++) {
    Restaurant.create(restaurantSeed.results[i])
  }
  console.log('done')
  })