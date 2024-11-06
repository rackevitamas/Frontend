import path from 'path'
import express from 'express'
import __dirname from '../util/rootpath.js'
import fs from 'fs'

const router = express.Router()
const storesFilePath = path.join(__dirname, 'public', 'data', 'stores.json')

// Helper function to save store to file
const saveStore = (store) => {
  fs.readFile(storesFilePath, (err, data) => {
    let stores = []
    if (!err) {
      stores = JSON.parse(data); // Parse existing stores
    }
    stores.push(store); // Add the new store
    fs.writeFile(storesFilePath, JSON.stringify(stores, null, 2), (err) => {
      if (err) {
        console.log(err)
      }
    })
  })
}

// /admin/add-store => GET
router.get('/add-store', (req, res, next) => {
  res.render('add-store', {
    pageTitle: 'Add Store',
    path: '/admin/add-store'
  })
})

// /admin/add-store => POST
router.post('/add-store', (req, res, next) => {
  const newStore = { title: req.body.title }
  saveStore(newStore)
  res.redirect('/')
})

export default router
