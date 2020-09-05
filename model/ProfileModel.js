const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min:3,
        max:255
    },
    systemId:{
        type: String,
        required: true,
    }
})
module.exports = mongoose.model('Profile', profileSchema)