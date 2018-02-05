var mongoose = require('mongoose');
var Item = require( './itemModel' );

var orderSchema = mongoose.Schema({

	tableNumber: Number,
	paid: { type: Boolean, default: false },
	items: [{ 	item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }, 
				quantity: Number 
			}],
	placed: { type: Date, default: Date.now }
	
});

module.exports = mongoose.model( 'Order', orderSchema );