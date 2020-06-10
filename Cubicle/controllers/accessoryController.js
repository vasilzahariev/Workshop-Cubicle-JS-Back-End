const mongoose = require('mongoose');

const Accessory = require('../models/accessory');

const createAccessory = async (name, description, imageUrl) => {
    const accessory = new Accessory({
        name,
        description,
        imageUrl
    });

    accessory.save((err) => {
        return err;
    })
}

module.exports = {
    createAccessory
}
