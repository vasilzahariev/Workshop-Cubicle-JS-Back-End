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
    }, privateKey);
}

module.exports = {
    register,
    login
}
