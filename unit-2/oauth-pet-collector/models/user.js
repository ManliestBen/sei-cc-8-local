var mongoose = require('mongoose');

var catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    default: "Mixed"
  },
  age: {
    type: Number,
    default: 0
  },
  owner: {
    type: String
  }
}, {timestamps: true}
);


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