const mongoose = require('mongoose');
const mongodb = require('mongodb')

const AccessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    cubes: [{
        type: 'ObjectID',
        ref: 'Cube'
    }]
});

module.exports = mongoose.model('Accessory', AccessorySchema);
