const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware')

const { getHomePage, getRenderPic } = require('../controllers/homeController');
const { loginUser, getMain, Login, Logout, getProfile, } = require('../controllers/mainController')

//router.get('/', getHomePage)
router.get('/home', getRenderPic)

router.get('/', Login) //Render ra trang login đầu
router.post('/login', loginUser); //check login
router.get('/logout', Logout); //clear token

module.exports = router;