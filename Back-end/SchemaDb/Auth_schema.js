const mongoose = require('mongoose');

const AuthSchema = mongoose.Schema({
    email:{type:String,required:true},
    passward:String,
    username:String,
    profile:{type:String,default:null}
});

module.exports = mongoose.model('AuthSchema',AuthSchema);