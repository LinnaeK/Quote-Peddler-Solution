const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/buy-quotes',
{useUnifiedTopology: true})

const db = mongoose.connection

db.on('connected', function() {
    console.log(`Connected to MongoDb at ${db.host}:${db.port}`)
})