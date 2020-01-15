var Cart = require('../models/cart.js')
var Store = require('../models/store.js')
var {Error} = require('../backendUtils/error')

async function decrementStore(id){
    const quote = await Store.findById(id)
    quote.quantity--
    console.log(quote)
    quote.save((err)=>{
        if(err){
            console.error(err)
        }
    } )
    if (quote.quantity < 0){
        return Error('There are no more quotes available.')
    } 
}

const incrementStore = async(id)=>{
    try {
        const quote = await Store.findById(id)
        quote.quantity++
        quote.save()
    }catch(e){
        res.json(e)
        console.log(e)
    }

}

const update = async(req, res) => {
    Cart.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}, 
    ).then(function(updatedCartQuote){
        res.status(200).json(updatedCartQuote)
    })
}

const show =  async(req, res) => {
    try {
        let cartQuote = await Cart.findById(req.params.id)
        res.status(200).json(cartQuote)
    }catch(e) {
        console.log(e)
        res.json(e)
    }
}

const create = async(req, res) => {
    try{
        const { _id, quantity, image, quote, price } = req.body
        const reduceStoreQuantity = await decrementStore(_id)
        const itemInCart = await Cart.findOne({ storeId: _id })
        console.log(itemInCart)
        if (itemInCart) {
            itemInCart.quantity += 1
            const saved = await itemInCart.save()
            res.json(saved)
        }else{
            const cartQuote = new Cart({
                storeId: _id,
                quantity,
                image,
                quote,
                price
            })
            cartQuote.quantity = 1
            const saved = await cartQuote.save()
            res.json(saved)
        }
    }catch(e){
        console.log(e)
        res.json(e)
    }
}

const index =  async(req, res) => {
    let cartQuotes = await Cart.find({})
    res.status(200).json(cartQuotes)
}

const deleteQuote = async(req,res) => {
    try {
        const removedItem = await Cart.findOne({_id: req.params.id})
        removedItem.quantity--
        if(removedItem.quantity <= 0){
            const success = removedItem.remove()
            const updateStore = await incrementStore(success.storeId)
            res.json(success)
        } else {
            const success = await removedItem.save()
            const updateStore = await incrementStore(success.storeId)
            res.send(success)
        }
    } catch (e) {
        console.log(e)
        res.json(e)
    }
}  

module.exports = {
    index,
    create, 
    show, 
    update, 
    delete: deleteQuote
}