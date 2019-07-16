const mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    prodName:String,
    prodImage:String,
    prodPrice:{type:Number,default:0.00},
    isDiscount:Boolean,
    prodDesc:{type:String}    
},{timestamps:true})
module.exports = mongoose.model('product',productSchema);