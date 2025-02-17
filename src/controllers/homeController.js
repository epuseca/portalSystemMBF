
module.exports = {
    getHomePage: (req, res) => {
        // res.send('Hello World! va nodemon ss')
        res.render('home/home.ejs');
    },
    getRenderPic: (req, res) => {
        res.render('home/home.ejs');
    }
}