var orders = require('../controllers/orderAPIController');
var Order = require( '../models/orderModel' );
var express = require('express');
var router = express.Router();

router.get('/', orders.list );
router.post('/', orders.create );
router.get('/:id', orders.lookupOrder);
router.patch('/:id',orders.updateOrder);
router.delete('/:id', orders.delete );

module.exports = router;