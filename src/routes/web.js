const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware')

const { getHomePage, getRenderPic } = require('../controllers/homeController');
const { loginUser, getMain, Login, Logout, getProfile, test} = require('../controllers/mainController')
const { getListSystem, postSystem, putSystem, deteteSystem } = require('../controllers/systemController.js')

//router.get('/', getHomePage)
router.get('/home', getRenderPic)

router.get('/', Login) //Render ra trang login đầu
router.get('/test', test) //Render ra trang login đầu
router.post('/login', loginUser); //check login
router.get('/logout', Logout); //clear token

//System
router.get('/system', getListSystem)
router.post('/system', postSystem)
router.put('/system/:idSystem', putSystem)
router.delete('/system/:idSystem', deteteSystem)

module.exports = router;