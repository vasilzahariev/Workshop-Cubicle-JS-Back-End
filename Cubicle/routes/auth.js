const express = require('express');
const usersController = require('../controllers/usersController');
const { checkForAuthentication,
        checkForAuthenticationPOST,
        checkForNoAuthentication,
        isAuth } = usersController;

const router = express.Router();

//#region Login

router.get('/login', usersController.checkForNoAuthentication, isAuth, (req, res) => {
    res.render('loginPage', {
        title: "Login",
        isAuth: req.isAuth
    })
});

router.post('/login', checkForAuthenticationPOST, async (req, res) => {
    const status = await usersController.login(req, res);

    if (status) res.redirect(302, '/');
    else res.redirect(302, '/login');
})

//#endregion

//#region Register

router.get('/register', usersController.checkForNoAuthentication, isAuth, (req, res) => {
    res.render('registerPage', {
        title: "Register",
        isAuth: req.isAuth
    })
});

router.post('/register', checkForAuthenticationPOST, async (req, res) => {
    const status = await usersController.register(req, res);

    if (status) res.redirect(302, '/');
    else res.redirect(302, '/register');
});

//#endregion

//#region Logout

router.get('/logout', usersController.checkForAuthentication, isAuth, (req, res) => {
    res.redirect('/');
})

//#endregion

module.exports = router;
