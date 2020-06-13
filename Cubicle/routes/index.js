const express = require('express');
const cubesController = require('../controllers/cubesController');
const qs = require('querystring');
const url = require('url');

const Cube = require('../models/cube');

const router = express.Router();

//#region Index

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

//#endregion

//#region About

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page'
    });
});

//#endregion

module.exports = router;
