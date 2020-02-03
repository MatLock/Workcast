const mongoose = require('mongoose');
const validator = require('../validator/Validators')

const articleSchema = new mongoose.Schema({
    userId:  {type:mongoose.Schema.Types.ObjectId,ref:'users'},
    title:   {type:String,   required:true, validator:validator.titleValidator},
    text:    {type:String,   required:true},
    tags:    [String]
});

module.exports = mongoose.model('articles',articleSchema);