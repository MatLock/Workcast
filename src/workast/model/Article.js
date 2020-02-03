const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    userId:  {type:mongoose.Schema.Types.ObjectId,ref:'users'},
    title:   {type:String,   required:true},
    text:    {type:String,   required:true},
    tags:    [String]
});

module.exports = mongoose.model('articles',articleSchema);