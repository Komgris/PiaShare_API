const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');

const userRoomSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    roomId:{
        type: String,
        required: true,
    },
    isOwner:{
        type:boolean,
        required: true,
    }
});
module.exports = mongoose.model('UserRoom',userRoomSchema)