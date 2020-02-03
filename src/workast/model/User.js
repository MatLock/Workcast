const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:   {type:String,  required:true},
   // avatar: {type:mongoose.SchemaTypes.Url,required:true}
});

userSchema.virtual('userId').get(() => {
  return this._id;
});

module.exports = mongoose.model('users',userSchema);