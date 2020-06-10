const express = require('express');
const cubesController = require('../controllers/cubesController');
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
            title: 'Home Page',
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

router.post('/create', async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    const err = await cubesController.createCube(name, description, imageUrl, difficultyLevel);

    if (err) console.log(err);
    else res.redirect(302, '/');
});

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;

    const cube = await cubesController.getCube(id);

    res.render('details', {
        title: 'Details Page',
        cube: cube
    })
});

router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;
