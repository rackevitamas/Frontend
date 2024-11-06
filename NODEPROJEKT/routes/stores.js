import path from 'path'
import express from 'express'
import __dirname from '../util/rootpath.js'
import fs from 'fs'

const router = express.Router()
const storesFilePath = path.join(__dirname, 'public', 'data', 'stores.json')

// Helper function to get stores from file
const getStores = (cb) => {
  fs.readFile(storesFilePath, (err, data) => {
    if (err) {
      cb([])
    } else {
      cb(JSON.parse(data))
    }
  })
}

router.get('/', (req, res, next) => {
  getStores((stores) => {
    res.render('stores', {
      prods: stores,
      pageTitle: 'Stores',
      path: '/'
    })
  })
})

export default router
