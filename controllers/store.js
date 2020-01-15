var Store = require('../models/store.js')

module.exports = {
    index,
    create, 
    show, 
    update, 
    delete: deleteStore
}

function update(req, res){
    Store.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}, 
    ).then(function(err, updatedStoreQuote){
        res.status(200).json(updatedStoreQuote)
    })
}

function show(req, res){
    Store.findById(req.params.id).then(function(storeQuote){
        res.status(200).json(storeQuote)
    })
}

async function create(req, res){
    console.log('controller create')
    console.log(req.body)
    let newEntry = await Store.create(req.body, function(err, storeQuote){
        console.log('inside callback')
        if(err){
            return res.status(400).json(err)
        }else{
            return res.status(201).json(storeQuote)
        }
    })
    console.log(newEntry)
    return(newEntry)
}

function index(req, res){
    Store.find({}).then(function(storeQuotes){
        res.status(200).json(storeQuotes)
    })
}

function deleteStore(req,res){
    Store.findByIdAndDelete(req.params.id).then(function(deletedStoreQuotes){
        res.status(200).json(deletedStoreQuotes)
    })
}