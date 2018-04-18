var mongoose = require('mongoose');  

var Schema = mongoose.Schema;

module.exports.user=mongoose.model('User',new Schema({
    name:String,
    loginid: String,
    password: String
},{strict: false}));