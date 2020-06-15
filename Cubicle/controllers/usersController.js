const env = process.env.NODE_ENV || "development"

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config')[env];
const User = require('../models/user');

const register = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user = new User({
        username,
        password: hashedPassword
    });

    const userObj = await user.save();

    const token = createUserToken(userObj);

    res.cookie('aid', token);

    return true;
}

const login = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    const user = await getUserByUsername(username);

    if (!user) {
        return false;
    } else {
        const hashedPassword = user.password;

        const status = await bcrypt.compare(password, hashedPassword);

        if (status) {
            const token = createUserToken(user);

            res.cookie('aid', token);
        }

        return status;
    }

}

const getUserByUsername = async (username) => {
    return await User.findOne({ username });
}

const createUserToken = user => {
    return jwt.sign({
        userId: user._id,
        username: user.username
    }, config.privateKey);
}

const checkForAuthentication = (req, res, next) => {
    const token = req.cookies['aid'];

    if (!token) return res.redirect('/');

    try {
        const decodedObj = jwt.verify(token, config.privateKey);

        if (decodedObj) next();
        else res.redirect('/');
    } catch (err) {
        console.log(err)
        
        return res.redirect('/');
    }
}

const checkForAuthenticationPOST = (req, res, next) => {
    const token = req.cookies['aid'];

    if (!token) return res.json({
        error: "Not authenticated"
    });

    try {
        const decodedObj = jwt.verify(token, config.privateKey);

        next();
    } catch (err) {
        return res.json({
            error: "Not authenticated"
        });
    }
}

const checkForNoAuthentication = (req, res, next) => {
    const token = req.cookies['aid'];

    if (token) return res.redirect('/');
    
    next();    
}

const isAuth = (req, res, next) => {
    const token = req.cookies['aid'];

    try {
        const decodedObj = jwt.verify(token, config.privateKey);

        req.isAuth = true;
    } catch (error) {
        req.isAuth = false;
    }

    next();
}

module.exports = {
    register,
    login,
    checkForAuthentication,
    checkForAuthenticationPOST,
    checkForNoAuthentication,
    isAuth
}
