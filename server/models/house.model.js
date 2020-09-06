const mongoose = require('mongoose');

const HouseSchema= new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    coordinates: {
        lat: {
            type: String,
            required: true,
        },
        long: {
            type: String,
            required: true,
        },
    },
    house: {
        rooms: {
            type:Number,
            required: true,
        },
        area: {
            type:Number,
            required: true,
        },
        floors: {
            type:Number,
            required: true,
        },
        bedroom: {
            type: Number,
            required: true,
        },
        kitchen: {
            type: Number,
            required: true,
        },
        toilet: {
            type: Number,
            required: true,
        },
    },
    price: {
        type: Number,
        required: true,
    },
    imageCollection: {
        type: Array,
        required: true,
    },
});

const House = mongoose.model('House', HouseSchema);

module.exports = House;
