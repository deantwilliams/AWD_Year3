var mongoose = require('mongoose');
var Item = require( './itemModel' );

var orderSchema = mongoose.Schema({

	tableNumber: Number,
	paid: Boolean,
	items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
	price: Number,
	placed: { type: Date, default: Date.now }
	
});

module.exports = mongoose.model( 'Order', orderSchema );