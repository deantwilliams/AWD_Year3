var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
	id: Number,
	name: String,
    price: Number
});

module.exports = mongoose.model( 'Item', itemSchema );