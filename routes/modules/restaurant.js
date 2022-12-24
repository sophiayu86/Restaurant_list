const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant') // 載入 Restaurant model
router.get('/new', (req, res) => {
    return res.render('new')
  })
router.post('/', (req, res) => {
    const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
    const restaurant_id = req.body.id
    const name_en = req.body.name_en
    const category = req.body.category
    const image = req.body.image
    const location = req.body.location
    const phone = req.body.phone
    const google_map = req.body.google_map
    const description = req.body.description
    const rating = req.body.rating
    return Restaurant.create({restaurant_id,name,name_en,category,image,location,phone,google_map,rating,description})     // 存入資料庫
        .then(() => res.redirect('/')) // 新增完成後導回首頁
        .catch(error => console.log(error))
})
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .lean()
      .then((restaurant) => res.render('edit', { restaurant }))
      .catch(error => console.log(error))
  })
router.put('/:id', (req, res) => {
    const id = req.params.id
    const restaurant_id = req.body.id
    const {name,name_en,category,image,location,phone,google_map,description,rating}= req.body
    
    return Restaurant.findById(id)
      .then(restaurant => {
        restaurant.name = name
        restaurant.id = restaurant_id
        restaurant.name_en = name_en
        restaurant.category = category
        restaurant.image = image
        restaurant.location = location
        restaurant.phone = phone
        restaurant.google_map = google_map
        restaurant.description = description
        restaurant.rating = rating
        return restaurant.save()
      })
      .then(()=> res.redirect(`/restaurants/${id}`))
      .catch(error => console.log(error))
  })
router.get('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .lean()
      .then((restaurant) => res.render('show', { restaurant }))
      .catch(error => console.log(error))
  })
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .then(restaurant => restaurant.remove())
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  })

module.exports = router