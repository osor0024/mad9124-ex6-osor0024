const Car = require('../models/Car')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const cars = await Car.find().populate('owner')
    res.send({data:cars})
})

router.post('/', async (req, res) => {
    let attributes =req.body
    delete attributes._id

    let newCar = new Car(attributes)
    await newCar.save()

    res.status(201).send({data: newCar})
})

router.get('/:id', async (req, res) => {

    try{

     const car = await Car.findById(req.params.id)
     if(!car) throw new Error('Resource no found')
    res.send({data: car})
    }catch(err){
        console.error(err)
       sendResourceNotFound(req, res)
    }
    
})

router.patch('/:id', async (req, res) => {
    try{
        const{_id, ...otherAttributes}= req.body
        const car = await Car.findByIdAndUpdate(
            req.params.id,
            {_id : req.params.id, ...otherAttributes},
            {
                new: true, 
            runValidators: true
        }
        )
        if(!car) throw new Error('Resource no found')
        res.send({data:car})
    } catch(err){
        sendResourceNotFound(req, res)
    }
})

router.put('/:id', async (req, res) => {
    try{
        const{_id, ...otherAttributes}= req.body
        const car = await Car.findByIdAndUpdate(
            req.params.id,
            {_id : req.params.id, ...otherAttributes},
            {
                new: true, 
                overwrite:true,
            runValidators: true
        }
        )
        if(!car) throw new Error('Resource no found')
        res.send({data:car})
    } catch(err){
        sendResourceNotFound(req, res)
    }
})

router.delete('/:id', async (req, res) => {

    try{
        const car = await Car.findByIdAndRemove(req.params.id)
        if(!car) throw new Error('Resource no found')
       res.send({data: car})
       }catch(err){
           console.error(err)
          sendResourceNotFound(req, res)
       }
})

function sendResourceNotFound(req, res){
    res.status(404).send({
        errors: [
          {
            status: 'Not Found',
            code: '404',
            title: 'Resource does not exist',
            description: `We could not find a car with id: ${req.params.id}`
          }
        ]
      })
}

module.exports = router