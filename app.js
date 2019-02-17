'use strict'

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mad9124', {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB ...'))
  .catch(err => {
    console.error('Problem connecting to MongoDB ...', err)
    process.exit(1)
  })
  

const express = require('express')
const app = express()

app.use(express.json())
app.use('/api/cars', require('./routes/cars'))
app.use('/api/people', require('./routes/people'))

const port = process.env.PORT || 3030

app.listen(port, () => console.log(`Server listening on port ${port} ...`))