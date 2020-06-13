const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const privateKey = "CUBE-WORKSHOP-SOFTUNI";

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

    const token = jwt.sign({
        userId: userObj._id,
        username: userObj.username
    }, privateKey);

    res.cookie('aid', token);

    return true;
}

module.exports = {
    register
}
