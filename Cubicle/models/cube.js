const uuid = require('uuid').v4;
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const mongodb = require('mongodb')

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    imageUrl: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    accessories: [{
        type: 'ObjectID',
        ref: 'Accessory'
    }]
});

module.exports = mongoose.model('Cube', CubeSchema);
