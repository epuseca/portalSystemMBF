const express = require('express');
const router = express.Router();
const { getHomePage, getRenderPic } = require('../controllers/homeController');


router.get('/', getHomePage)
router.get('/home', getRenderPic)

module.exports = router;