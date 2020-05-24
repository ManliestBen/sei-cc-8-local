var mongoose = require('mongoose');

var catSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number
})


var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  googleId: String,
  cats: [catSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);