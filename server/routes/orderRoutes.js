var orders = require('../controllers/orderAPIController');
var Order = require( '../models/orderModel' );
var express = require('express');
var router = express.Router();

router.get('/', orders.list );
router.post('/', orders.create );
router.get('/:id', orders.lookupOrder, function( req, res ){ res.json( req.order ); });
router.delete('/:id', orders.delete );

module.exports = router;