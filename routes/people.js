const Person = require('../models/Person')
const express = require('express')
const router = express.Router()

router.get('/', async(req, res)=>{
    const people = await Person.find()
    res.send({data: people})
})
router.post('/', async (req, res) => {
    let attributes =req.body
    delete attributes._id

    let newPerson = new Person(attributes)
    await newPerson.save()

    res.status(201).send({data: newPerson})
})

router.get('/:id', async (req, res) => {

    try{

     const person = await Person.findById(req.params.id)
     if(!person) throw new Error('Resource no found')
    res.send({data: person})
    }catch(err){
        console.error(err)
       sendResourceNotFound(req, res)
    }
    
})

router.patch('/:id', async (req, res) => {
    try{
        const{_id, ...otherAttributes}= req.body
        const person = await Person.findByIdAndUpdate(
            req.params.id,
            {_id : req.params.id, ...otherAttributes},
            {
                new: true, 
            runValidators: true
        }
        )
        if(!person) throw new Error('Resource no found')
        res.send({data: person})
    } catch(err){
        sendResourceNotFound(req, res)
    }
})

router.put('/:id', async (req, res) => {
    try{
        const{_id, ...otherAttributes}= req.body
        const person = await Person.findByIdAndUpdate(
            req.params.id,
            {_id : req.params.id, ...otherAttributes},
            {
                new: true, 
                overwrite:true,
            runValidators: true
        }
        )
        if(!person) throw new Error('Resource no found')
        res.send({data:person})
    } catch(err){
        sendResourceNotFound(req, res)
    }
})

router.delete('/:id', async (req, res) => {

    try{
        const person = await Person.findByIdAndRemove(req.params.id)
        if(!person) throw new Error('Resource no found')
       res.send({data: person})
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
            description: `We could not find a person with id: ${req.params.id}`
          }
        ]
      })
}
module.exports = router