var
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy

var User = require('../models/User.js')

// stores logged in user and makes/stores a key in a cookie
passport.serializeUser(function(user,done){
  done(null,user.id)
})
// looks at the cookie and decodes it back into user object
passport.deserializeUser(function(id,done){
  User.findById(id).populate('paths').exec(function(err, user){
    done(err,user)
  })
})

// LOCAL SIGNUP MIDDLEWARE ===============================
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    User.findOne({'local.email': email}, function(err, user){
        if(err) return done(err)
        if(user) return done(null, false, req.flash('signupMessage', 'That email is taken.'))
        var newUser = new User()
        newUser.local.name = req.body.name
        newUser.local.email = email
        newUser.local.password = password

        newUser.save(function(err){
            if(err) throw err
            return done(null, newUser, null)
        })
    })
}))

// LOCAL SIGNIN MIDDLEWARE ===============================
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    User.findOne({'local.email': email}, function(err, user){
        if(err) return done(err)
        if(!user) return done(null, false, req.flash('loginMessage', 'No user found...'))
        if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wrong Password.'))

        return done(null, user)
    })
}))

module.exports = passport
