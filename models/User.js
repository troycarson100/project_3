var
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs')

var userSchema = mongoose.Schema({
  local: {
    name: {type: String},
    email : {type: String},
    password: {type: String}
  },
  img: {type: String},
  bio: {type: String},
  paths: [{type: mongoose.Schema.Types.ObjectId, ref:'Path'}]
})

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password)
}

userSchema.pre('save', function(next){
  if(!this.isModified('local.password')) return next()
  this.local.password = this.generateHash(this.local.password)
  next()
})

var User = mongoose.model('User', userSchema)

module.exports = User
