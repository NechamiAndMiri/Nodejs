var mongoose = require('mongoose');
const Product = require('./ProductModel');
const User = require('./UserModel');

var Schema   = mongoose.Schema;

const ItemSchema = new Schema({
	'Product' : {
		type: Schema.Types.ObjectId,
		ref: Product
   },	'quantity' : Number
});

var OrderSchema = new Schema({
	'sum' : Number,
	'date' : Date,
	'user' : {
	 	type: Schema.Types.ObjectId,
	 	ref: User
	},
	'items' : [ItemSchema]
},{virtuals:true});

module.exports = mongoose.model('Order', OrderSchema);
