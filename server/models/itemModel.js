var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
	id: Number,
	name: String,
    price: Number,
	deleted: {type: Boolean, default: false}
});

module.exports = mongoose.model( 'Item', itemSchema );