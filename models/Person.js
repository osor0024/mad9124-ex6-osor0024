const mongoose = require('mongoose')


const schema =new mongoose.Schema({

    firstName: String,
    lastName: String,
    email: String,
    owner:{type: mongoose.Schema.Types.ObjectId, ref:'Person'}
})

const Model = mongoose.model('Person', schema)
module.exports =Model