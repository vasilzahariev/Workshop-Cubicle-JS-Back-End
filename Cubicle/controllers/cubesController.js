const path = require('path');
const fs = require('fs');

const mongoose = require('mongoose');

const Cube = require('../models/cube');

const getAllCubes = async () => {
    const cubes = await Cube.find().lean();

    return cubes;
}

const getCube = async (id) => {
    const cube = await Cube.findById(id).lean();

    return cube
}

const createCube = async (name, description, imageUrl, difficultyLevel, creatorId) => {
    const cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty: difficultyLevel,
        creatorId: creatorId
    });
    
    cube.save((err) => {
        return err;
    });
}

const getFilteredCubes = async (search, from, to) => {
    const cubes = (await Cube.find().lean())
                    .filter(c =>c.name.toLowerCase().includes(search.toLowerCase()) &&
                                c.difficulty >= from && c.difficulty <= to);


    return cubes;
}

const addAccessoryToCube = async (cubeId, accessory) => {
    await Cube.findByIdAndUpdate(cubeId, {
        $addToSet: { 
            accessories: [accessory]
        }
    });
}

const deleteCube = async cubeId => {
    await Cube.deleteOne({_id: cubeId});
}

module.exports = {
    getAllCubes,
    getCube,
    createCube,
    getFilteredCubes,
    addAccessoryToCube,
    deleteCube
}
