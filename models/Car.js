const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    make: String,
    model: String,
    colour:String
})

const Model =mongoose.model('Car', schema)

module.exports = Model