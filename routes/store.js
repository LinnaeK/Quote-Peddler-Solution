var express = require('express');
var router = express.Router();
var storeCtrl = require('../controllers/store')

/* GET users listing. */
router.get('/', storeCtrl.index);
router.get('/:id', storeCtrl.show);
router.post('/', storeCtrl.create);
router.put('/:id', storeCtrl.update);
router.delete('/:id', storeCtrl.delete);

module.exports = router;
