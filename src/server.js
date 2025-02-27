require('dotenv').config()
const express = require('express') //import express
const path = require('path')

const configViewEngine = require('./config/viewEngine.js')
const webRoutes = require('./routes/web.js')
const connection = require('./config/database');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express() // tạo express application
const port = process.env.PORT || 10000  // init port
const hostname = process.env.HOST_NAME  // init port

app.use(fileUpload())

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);

app.use('/', webRoutes);



(async () => {
    try {
        await connection();
        app.listen(port, hostname, () => {
            console.log(`Backend app listening on port ${port}`);
        });
    } catch (error) {
        console.log(">>> Error connect db", error);
    }
})();