var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
// const { isEmail } =require( 'validator');
var uniqueValidator = require('mongoose-unique-validator');

const addressSchema=new Schema({
    city:String,
    street:String,
    number:Number
}) 
var UserSchema = new Schema({
	'name' : String,
	'email' : {
		type:String,     
		unique: true,
        validate: {
            validator: function(v) {
				
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
	},
	'password' : String,
	'address':String
},{timestamps:true});

UserSchema.virtual('orders'),
{
	ref:'Order',
	localField:'_id',
	foreigenField:'user'
}

UserSchema.plugin(uniqueValidator);

UserSchema.set('toJSON',{virtuals:true})
UserSchema.set("toObject",{virtuals:true})

module.exports = mongoose.model('User', UserSchema);
