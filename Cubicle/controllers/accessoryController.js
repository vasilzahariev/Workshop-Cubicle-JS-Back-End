const mongoose = require('mongoose');
const cubesController = require('../controllers/cubesController');

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

const getAllAccessories = async () => {
    const accessories = await Accessory.find().lean();

    return accessories;
}

const getUnatachedAccessories = async (cubeId) => {
    const cubeAccessories = (await cubesController.getCube(cubeId)).accessories;
    
    const unatachedAccessories = await (await getAllAccessories())
                                        .filter(a => {
                                            for (let i = 0; i < cubeAccessories.length; i++) {
                                                if (a._id.equals(cubeAccessories[i])) {
                                                    return false;
                                                }
                                            }
                                            
                                            return true;
                                        });

    return unatachedAccessories;
}

const getAtachedAccessories = async (cubeId) => {
    const cubeAccessories = (await cubesController.getCube(cubeId)).accessories;
    
    const atachedAccessories = await (await getAllAccessories())
                                        .filter(a => {
                                            for (let i = 0; i < cubeAccessories.length; i++) {
                                                if (a._id.equals(cubeAccessories[i])) {
                                                    return true;
                                                }
                                            }
                                            
                                            return false;
                                        });

    return atachedAccessories;
}

module.exports = {
    createAccessory,
    getUnatachedAccessories,
    getAtachedAccessories
}
