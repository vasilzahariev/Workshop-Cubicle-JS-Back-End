const express = require('express');
const cubesController = require('../controllers/cubesController');
const accessoryController = require('../controllers/accessoryController');
const qs = require('querystring');
const url = require('url');

const Cube = require('../models/cube');

const router = express.Router();

router.get('/', async (req, res) => {
    const {
        search,
        from,
        to
    } = qs.parse(url.parse(req.url).query);

    if (search === undefined &&
        from === undefined &&
        to === undefined) {
        const cubes = await cubesController.getAllCubes();
        
        res.render('index', {
            title: 'Home Page',
            cubes: cubes
        });
    } else {
        const newFrom = from === undefined || from === '' ? 1 : from;
        const newTo = to === undefined || to === '' ? 6 : to;

        const cubes = await cubesController.getFilteredCubes(search, newFrom, newTo);
        
        res.render('index', {
            title: 'Browser',
            cubes: cubes
        })
    }
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page'
    });
});

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create A Cube'
    });
});

// TODO: When there's an invalid image url make it so it shows an error message
router.post('/create', async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    const err = await cubesController.createCube(name, description, imageUrl, difficultyLevel);

    if (err) {
        console.log(err);

        res.redirect('/create');
    } else { 
        res.redirect(302, '/');
    }
});

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', {
        title: 'Create An Accessory'
    });
});

router.post('/create/accessory', async (req, res) => {
    const {
        name,
        description,
        imageUrl
    } = req.body;

    const err = await accessoryController.createAccessory(name, description, imageUrl);

    if (err) console.log(err);
    else res.redirect(302, '/');
});

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;

    const cube = await cubesController.getCube(id);
    const accessories = await accessoryController.getAtachedAccessories(id);

    res.render('details', {
        title: 'Details Page',
        cube: cube,
        accessories: accessories
    });
});

router.get('/attach/accessory/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await cubesController.getCube(id);
    const accessories = await accessoryController.getUnatachedAccessories(id);

    res.render('attachAccessory', {
        title: 'Attach Accessory',
        cube: cube,
        accessories: accessories
    })
});

router.post('/attach/accessory/:id', async (req, res) => {
    const cubeId = req.params.id;
    const accessoryId = req.body.accessory;

    await cubesController.addAccessoryToCube(cubeId, accessoryId);

    res.redirect(302, `/details/${cubeId}`);
});


router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;
