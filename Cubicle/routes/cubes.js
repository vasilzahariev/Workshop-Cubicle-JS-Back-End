const express = require('express');
const cubesController = require('../controllers/cubesController');
const accessoryController = require('../controllers/accessoryController');

const router = express.Router();

//#region Create

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

//#endregion

//#region Edit

router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await cubesController.getCube(id);

    res.render('EditCubePage', {
        title: "Edit Cube",
        cube: cube
    });
})

//#endregion

//#region Details

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

//#endregion

//#region Delete

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await cubesController.getCube(id);
    
    res.render('deleteCubePage', {
        title: "Delete Cube",
        cube: cube
    })
})

//#endregion


module.exports = router;
