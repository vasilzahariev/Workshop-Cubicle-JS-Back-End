const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

//#region Login

router.get('/login', (req, res) => {
    res.render('loginPage', {
        title: "Login"
    })
});

router.post('/login', async (req, res) => {
    const status = await usersController.login(req, res);

    if (status) res.redirect(302, '/');
    else res.redirect(302, '/login');
})

//#endregion

//#region Register

router.get('/register', (req, res) => {
    res.render('registerPage', {
        title: "Register"
    })
});

router.post('/register', async (req, res) => {
    const status = await usersController.register(req, res);

    if (status) res.redirect(302, '/');
    else res.redirect(302, '/register');
});

//#endregion

module.exports = router;
