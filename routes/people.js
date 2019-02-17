const Person = require('../models/Person')
const express = require('express')
const router = express.Router()

router.get('/', async(req, res)=>{
    const people = await Person.find()
    res.send({data: people})
})
module.exports = router