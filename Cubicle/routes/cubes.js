const env = process.env.NODE_ENV || "development"

const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/config')[env];
const { checkForAuthentication,
        isAuth,
        checkForAuthenticationPOST,
        checkIfUserIsCreator } = require('../controllers/usersController');
const cubesController = require('../controllers/cubesController');
const accessoryController = require('../controllers/accessoryController');

const router = express.Router();

//#region Create

router.get('/create', checkForAuthentication, isAuth, (req, res) => {
    res.render('create', {
        title: 'Create A Cube',
        isAuth: req.isAuth
    });
});

// TODO: When there's an invalid image url make it so it shows an error message
router.post('/create', checkForAuthenticationPOST, async (req, res) => {
    const token = req.cookies['aid'];
    const decodedObj = jwt.verify(token, config.privateKey);
    const userId = decodedObj.userId;

    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    const err = await cubesController.createCube(name, description, imageUrl, difficultyLevel, userId);

    if (err) {
        console.log(err);

        res.redirect('/create');
    } else { 
        res.redirect(302, '/');
    }
});

//#endregion

//#region Edit

router.get('/edit/:id', checkForAuthentication, isAuth, async (req, res) => {
    const id = req.params.id;
    const cube = await cubesController.getCube(id);

    res.render('EditCubePage', {
        title: "Edit Cube",
        cube: cube,
        isAuth: req.isAuth
    });
})

//#endregion

//#region Details

router.get('/details/:id', isAuth, async (req, res) => {
    const id = req.params.id;

    const cube = await cubesController.getCube(id);
    const accessories = await accessoryController.getAtachedAccessories(id);

    res.render('details', {
        title: 'Details Page',
        cube: cube,
        accessories: accessories,
        isAuth: req.isAuth
    });
});

//#endregion

//#region Delete

router.get('/delete/:id', checkForAuthentication, checkIfUserIsCreator, isAuth, async (req, res) => {
    const id = req.params.id;
    const cube = await cubesController.getCube(id);
    
    res.render('deleteCubePage', {
        title: "Delete Cube",
        cube: cube,
        isAuth: req.isAuth
    })
})

router.post('/delete/:id', checkForAuthentication, checkIfUserIsCreator, async (req, res) => {
    const cubeId = req.params.id;

    await cubesController.deleteCube(cubeId);

    res.redirect(302, '/')
})

//#endregion


module.exports = router;
