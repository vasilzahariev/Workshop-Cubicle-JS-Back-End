const express = require('express');

const router = express.Router();

//#region Login

router.get('/login', (req, res) => {
    res.render('loginPage', {
        title: "Login"
    })
});

router.post('login', (req, res) => {
    res.redirect(302, '/');
})

//#endregion

//#region Register

router.get('/register', (req, res) => {
    res.render('registerPage', {
        title: "Register"
    })
});

router.post('register', (req, res) => {
    //
});

//#endregion

module.exports = router;
