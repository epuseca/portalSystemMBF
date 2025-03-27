const { bcryptUtil } = require("../config/hash")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js');
const System = require("../models/system.js");
const Tag = require('../models/tag'); // đảm bảo import model Tag

module.exports = {
    test: async (req, res) => {
        let listSystems = await System.find({}).populate('tagNv');
        let listTags = await Tag.find({});

        let isLoggedIn = false;
        let user = null;
        if (req.cookies.token) {
            try {
                user = jwt.verify(req.cookies.token, 'namdv');
                isLoggedIn = true;
            } catch (err) {
                // Nếu token không hợp lệ hoặc hết hạn
            }
        }
        res.render('home/test.ejs', {
            listSystems: listSystems,
            listTags: listTags,
            isLoggedIn: isLoggedIn,
            user: user,
        });
    },
    Login: async (req, res) => {
        let results = await System.find({});
        let isLoggedIn = false;
        let user = null;
        if (req.cookies.token) {
            try {
                // Kiểm tra và giải mã token
                user = jwt.verify(req.cookies.token, 'namdv');
                isLoggedIn = true;
            } catch (err) {
                // Nếu token không hợp lệ hoặc hết hạn, không xác định đăng nhập
            }
        }
        res.render('home/home.ejs', {
            listSystems: results,
            isLoggedIn: isLoggedIn,
            user: user
        });

    },
    Logout: async (req, res) => {
        res.clearCookie('token');
        req.flash('logout', 'Đăng xuất thành công!');
        res.redirect('/');
    },
    loginUser: async (req, res) => {
        console.log(">>>>req body:", req.body);
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (!user) {
            req.flash('error', 'Invalid password');
            return res.redirect('/');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            req.flash('error', 'Invalid password');
            return res.redirect('/');
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role,
            username: user.username,
            name: user.name,
            mssv: user.mssv,
            email: user.email,
            address: user.address,
            sex: user.sex,
            khoa: user.khoa,
            lop: user.lop,
            idCtdt: user.idCtdt
        }, 'namdv', { expiresIn: '3h' });

        // Đặt cookie chứa token
        res.cookie('token', token, { httpOnly: true });
        // Redirect về trang chủ sau khi đăng nhập thành công
        req.flash('success', 'Đăng nhập thành công!');
        return res.redirect('/');
    },

}