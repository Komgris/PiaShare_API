const mongoose = require('mongoose')

const sharedRoomSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min:3,
        max:255
    },
    budget:{
        type: Number,
        required: true,
        min:1
    },
    member:{
        type:Number,
        required:true,
        min:1
    },
    peroid:{
        type:Number,
        required:true,
        min:1
    },
    start:{
        type:Date,
        required:true
    },
    finish:{
        type:Date,
        required:true
    },
    owner:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('SharedRoom',sharedRoomSchema)