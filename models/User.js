var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  name: {type: String},
  email: {type: String},
  password: {type: String},
  img: {type: String},
  bio: {type: String},
  paths: [{type: mongoose.Schema.Types.ObjectId, ref:'Path'}]
})

var User = mongoose.model('User', userSchema)

module.exports = User
