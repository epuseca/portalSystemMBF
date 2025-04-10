const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware')

const { getHomePage, getRenderPic } = require('../controllers/homeController');
const { loginUser, getMain, Login, Logout, getProfile, test } = require('../controllers/mainController')
const { getListSystem, postSystem, putSystem, deteteSystem, searchSystem, postUploadSingleFileApi } = require('../controllers/systemController.js')
const { getListTag, postTag, putTag, deteteTag, getListTagJson } = require('../controllers/tagController.js')
const { getListUser, postUser, putUser, deteteUser } = require('../controllers/userController.js')

//router.get('/', getHomePage)
router.get('/home', getRenderPic)

// router.get('/', Login) //Render ra trang login đầu
router.get('/', test) //Render ra trang login đầu thành test
router.get('/test', test) //Render ra trang login đầu
router.post('/login', loginUser); //check login
router.get('/logout', Logout); //clear token

//System
router.get('/system', middleware.verifyToken, middleware.roleAdmin, getListSystem)
router.get('/system/search', middleware.verifyToken, middleware.roleAdmin, searchSystem);
router.post('/system', middleware.verifyToken, middleware.roleAdmin, postSystem)
router.put('/system/:id', middleware.verifyToken, middleware.roleAdmin, putSystem)
router.delete('/system/:idSystem', middleware.verifyToken, middleware.roleAdmin, deteteSystem)

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
router.get('/tag/api', getListTagJson);


//File upload
router.post('/file', postUploadSingleFileApi)

module.exports = router;