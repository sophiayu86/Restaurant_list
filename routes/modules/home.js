const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant') // 載入 Restaurant model
router.get('/', (req, res) => {
  Restaurant.find() // 取出 model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find() // 取出 model 裡的所有資料
  .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
  .then(value => {
    const restaurants = value.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase())||restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { restaurants: restaurants, keyword: keyword })
  }) // 將資料傳給 index 樣板
  .catch(error => console.error(error)) // 錯誤處理
})
module.exports = router