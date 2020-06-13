const express = require('express');
const cubesController = require('../controllers/cubesController');
const accessoryController = require('../controllers/accessoryController');

const router = express.Router();

//#region Create

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

//#endregion

//#region Attach Accessory

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

//#endregion

module.exports = router;
