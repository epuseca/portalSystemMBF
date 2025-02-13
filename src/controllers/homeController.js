
module.exports = {
    getHomePage: (req, res) => {
        res.send('Hello World! va nodemon ss')
    },
    getRenderPic: (req, res) => {
        res.render('home/home.ejs');
    }
}