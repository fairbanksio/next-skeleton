let mongoose = require('mongoose')
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  google: Object,
  photo: String,
});
module.exports = mongoose.model('User', UserSchema)
