const mongoose = require('mongoose');
const RoomSchema = new mongoose.Schema({
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
    room: {
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
        kitchen: {
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

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;

module.exports = Room;
module.exports = Room;
