var Cart = require('../models/cart.js')
var Store = require('../models/store.js')

module.exports = {
    index,
    create, 
    show, 
    update, 
    delete: deleteQuote
}

const update = async(req, res){
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
        const itemInCart = await Cart.findOne({ itemId: _id })
        const decrementStore = await decrementStore(itemId)
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

            const saved = await cartQuote.save()
            res.json(saved)
        }
    }catch(e){
        console.log(e)
        res.json(e)
    }
}

const decrementStore = async(id)=>{
    const quote = Store.findById(id)
    quote.quantity--
    quote.save()
}

const incrementStore = async(id)=>{
    try {
        const quote = Store.findById(id)
        quote.quantity++
        quote.save()
    }catch(e){
        res.json(e)
        console.log(e)
    }

}

const index =  async(req, res) => {
    await.Cart.find({})
}

const deleteQuote = async(req,res) => {
    try {
        const removedItem = await Cart.findOne(req.params._id)
        removedItem.quantity--
        if(removedItem.quantity <= 0)){
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