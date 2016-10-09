var mongoose = require('mongoose')

var userSchema = mongoose.Scgema({
  name : {type: String, required:true},
  email : {type: String, required:true, unique:true},
  password: {type: String},
  img: {type: String},
  bio: {type: String},
  path: [{type: mongoose.Schema.Types.ObjectID, ref:'Path'}]
})

var User = mongoose.model('User', userSchema)

module.exports = User
