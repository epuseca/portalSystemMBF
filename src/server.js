require('dotenv').config()
const express = require('express') //import express
const path = require('path')

const configViewEngine = require('./config/viewEngine.js')
const webRoutes = require('./routes/web.js')
const connection = require('./config/database');
const Kitten = require('./models/Kitten.js')

const app = express() // tạo express application
const port = process.env.PORT // init port
const hostname = process.env.HOST_NAME  // init port

configViewEngine(app);

app.use('/', webRoutes);

const cat = new Kitten({ name: 'models test 1123' });
cat.save();


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