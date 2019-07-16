var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    email : String,    
    password : String,
    name : String,
    created : {type : Date,default : Date.now}
})

module.exports = mongoose.model('User',userSchema);