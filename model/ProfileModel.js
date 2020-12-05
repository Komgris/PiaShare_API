const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min:3,
        max:255
    },
    systemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
})
module.exports = mongoose.model('Profile', profileSchema)