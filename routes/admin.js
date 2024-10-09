import express from "express";
import path from 'path';
import __dirname from '../util/rootpath.js'

const router = express.Router();



router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'add-product.html'));
})

router.post('/add-product', (req, res, next) => {
    const title = req.body.title;
    console.log(title);
    res.redirect('/');
})


export default router