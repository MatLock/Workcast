const mongoose = require('mongoose');
const validator = require('../validator/Validators');

const userSchema = new mongoose.Schema({
    name:   {type:String, required:true,validate: validator.stringValidator},
    avatar: {type:String, required:true, validate: validator.urlValidator}
},{timestamps: { createdAt: 'createdAt'}});

userSchema.virtual('userId').get(() => {
  return this._id;
});


module.exports = mongoose.model('users',userSchema);