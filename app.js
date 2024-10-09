import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import __dirname from './util/rootpath.js';
import adminRoutes from './routes/admin.js';
import shopRoutes from './routes/shop.js';


const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use('/', shopRoutes);


app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => {console.log(`server is listening on port: http://localhost:${PORT}/`)})