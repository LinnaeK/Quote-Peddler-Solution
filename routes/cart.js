var express = require('express');
var router = express.Router();
var quotesCartCtrl = require('../controllers/cart')

/* GET users listing. */
router.get('/', quotesCartCtrl.index);
router.get('/:id', quotesCartCtrl.show);
router.post('/', quotesCartCtrl.create);
router.put('/:id', quotesCartCtrl.update);
router.delete('/:id', quotesCartCtrl.delete);

module.exports = router;
