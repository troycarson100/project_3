var
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs')

var userSchema = mongoose.Schema({
  local: {
    name: {type: String},
    email : {type: String},
    password: {type: String}
  },
  facebook: {
    id: String,
    name: String,
    token: String,
    email: String
},
  img: {type: String},
  bio: {type: String}
  // path: {type: mongoose.Schema.Types.ObjectID, ref:'Path'}
})

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password)
}

var User = mongoose.model('User', userSchema)

module.exports = User
