const { boolean, bool } = require('@hapi/joi')
const mongoose = require('mongoose')

const requestRoomSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    roomId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sharedrooms"
    },
    isAccept:{
        type: Boolean,
        required: true,
    },

})
module.exports = mongoose.model('RequestRoom', requestRoomSchema)