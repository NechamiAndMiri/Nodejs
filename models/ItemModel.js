const mongoose = require('mongoose');
const ProductModel = require('./ProductModel');
const Schema   = mongoose.Schema;

const ItemSchema = new Schema({
	'Product' : {
		type: Schema.Types.ObjectId,
		ref: Product
   },	'quantity' : Number
});

module.exports = mongoose.model('Item', ItemSchema);