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
    creatorId: {
        type: 'ObjectID',
        ref: 'User'
    },
    accessories: [{
        type: 'ObjectID',
        ref: 'Accessory'
    }]
});

CubeSchema.path('imageUrl').validate(function(url) {
    return url.includes('http') || url.includes('https');
}, 'Image url is not valid');

module.exports = mongoose.model('Cube', CubeSchema);
