const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware')

const { getHomePage, getRenderPic } = require('../controllers/homeController');
const { loginUser, getMain, Login, Logout, getProfile, test } = require('../controllers/mainController')
const { getListSystem, postSystem, putSystem, deteteSystem } = require('../controllers/systemController.js')
const { getListTag, postTag, putTag, deteteTag } = require('../controllers/tagController.js')
const { getListUser, postUser, putUser, deteteUser } = require('../controllers/userController.js')

//router.get('/', getHomePage)
router.get('/home', getRenderPic)

// router.get('/', Login) //Render ra trang login đầu
router.get('/', test) //Render ra trang login đầu thành test
router.get('/test', test) //Render ra trang login đầu
router.post('/login', loginUser); //check login
router.get('/logout', Logout); //clear token

//System
router.get('/system', getListSystem)
router.post('/system', postSystem)
router.put('/system/:idSystem', putSystem)
router.delete('/system/:idSystem', deteteSystem)

//người dùng
router.get('/user', getListUser)
router.post('/user', postUser)
router.put('/user/:idUser', putUser)
router.delete('/user/:idUser', deteteUser)

//tag người dùng
router.get('/tag', getListTag)
router.post('/tag', postTag)
router.put('/tag/:idTag', putTag)
router.delete('/tag/:idTag', deteteTag)

module.exports = router;