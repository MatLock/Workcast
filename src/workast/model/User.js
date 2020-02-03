const mongoose = require('mongoose');
const validate = require('mongoose-validator')
require('mongoose-type-url');

const URL_REGEX = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

const urlValidator = validate({
    validator: (val) => {
      return URL_REGEX.test(val)
    },
    message: 'Avatar must be an URL'
});

const userSchema = new mongoose.Schema({
    name:   {type:String,  required:true},
    avatar: {type:String,required:true,validate: urlValidator}
},{timestamps: { createdAt: 'createdAt'}});

userSchema.virtual('userId').get(() => {
  return this._id;
});


module.exports = mongoose.model('users',userSchema);