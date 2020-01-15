const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    id: Number,
    storeId: String,
    quantity: Number, 
    image: String,
    quote: String,
    price: Number
})

module.exports = mongoose.model('buy-quotes', cartSchema)