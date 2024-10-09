import express from "express";
import path from 'path';
import __dirname from '../util/rootpath.js'

const router = express.Router();


router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'shop.html'));
})

export default router