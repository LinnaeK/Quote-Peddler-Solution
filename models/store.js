const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StoreSchema = new Schema({
    id: Number,
    quantity: Number, 
    image: String,
    quote: String,
    price: Number
})

module.exports = mongoose.model('sell-quotes', StoreSchema)