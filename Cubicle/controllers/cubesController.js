const path = require('path');
const fs = require('fs');

const Cube = require('../models/cube');

function createCube(name, desc, imageUrl, difficulty) {
    const cube = new Cube(name, desc, imageUrl, difficulty);

    cube.save();
}

function getCubes() {
    const filePath = path.join(__dirname, path.normalize('../config/database.json'))

    return JSON.parse(fs.readFileSync(filePath));
}

function getCube(id) {
    const cube = getCubes().filter(c => c.id === id)[0];

    return cube;
}

function getFilteredCubes(search, from, to) {
    const cubes = getCubes()
                    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) &&
                                 c.difficulty >= from && c.difficulty <= to);

    return cubes;
}

module.exports = {
    getCubes,
    createCube,
    getCube,
    getFilteredCubes
}
