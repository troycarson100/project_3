var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  name: {type: String},
  email : {type: String},
  password: {type: String},
  img: {type: String},
  bio: {type: String},
  // path: {type: mongoose.Schema.Types.ObjectID, ref:'Path'}
})

var User = mongoose.model('User', userSchema)

module.exports = User
