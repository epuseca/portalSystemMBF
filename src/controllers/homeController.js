const getHomePage = (req, res) => {
    res.send('Hello World! va nodemon ss')
}
const getRenderPic = (req, res) => {
    res.render('sample.ejs');
}
module.exports = {
    getHomePage,
    getRenderPic
}