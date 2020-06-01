const express = require('express');
const cubesController = require('../controllers/cubesController');
const qs = require('querystring');
const url = require('url');

const router = express.Router();

router.get('/', (req, res) => {
    const {
        search,
        from,
        to
    } = qs.parse(url.parse(req.url).query);

    if (search === undefined &&
        from === undefined &&
        to === undefined) {
        res.render('index', {
            title: 'Home Page',
            cubes: cubesController.getCubes()
        });
    } else {
        const newFrom = from === undefined || from === '' ? 1 : from;
        const newTo = to === undefined || to === '' ? 6 : to;
        
        res.render('index', {
            title: 'Home Page',
            cubes: cubesController.getFilteredCubes(search, newFrom, newTo)
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

router.post('/create', (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    cubesController.createCube(name, description, imageUrl, difficultyLevel);

    res.redirect(302, '/');
});

router.get('/details/:id', (req, res) => {
    const id = req.params.id;

    const cube = cubesController.getCube(id);

    res.render('details', {
        title: 'Details Page',
        cube: cube
    })
});

router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;
