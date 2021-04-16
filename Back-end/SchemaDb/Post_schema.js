const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    image:String,
    comment:{
        type:Array,
        default:null,
        ref:'AuthSchema'
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AuthSchema'
    },
    disc:String
});

module.exports = mongoose.model('PostSchema',PostSchema);