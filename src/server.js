const express = require('express') //import express
const path = require('path')

const app = express() // tạo express application
const port = 3000 // init port

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/abc', (req, res) => {
    res.render('sample.ejs')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})