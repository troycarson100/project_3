var
 express = require('express'),
 passport = require('passport'),
 userRouter = express.Router(),
 User = require('../models/User.js'),
 Path = require('../models/Path.js')


 // index of ALL users:
userRouter.get('/users', function(req,res){
  User.find({}, function(err, users){
    if(err) return console.log(err)
    res.json(users)
  })
})

// create new user:
userRouter.post('/users', function(req,res){
  User.create(req.body, function(err, user){
    if(err) return console.log(err)
    res.json({success: true, user: user})
  })
})

// get a single user:
userRouter.get('/users/:id', function(req,res){
  // When we find the user by _id, we replace its 'Path' array with an array of ACTUAL complete path objects using .populate()
  // THEN we execute the callback which sends the populated user to the client:
  User.findById(req.params.id).populate('paths').exec(function(err, user){
    if(err) return console.log(err)
    res.json(user)
  })
})

userRouter.route('/users/:id/paths')
.post(function(req, res) {
  // first find the artist by its _id:
  User.findById(req.params.id, function(err, user) {
    // then create an album object (not yet saved to the database):
    var newPath = new Path(req.body)
    // store the aforementioned artist's _id for this album's '_by' field:
    newPath._by = user._id
    // then save the album to the database:
    newPath.save(function(err) {
      if(err) return console.log(err)
      // once the album is stored in the db, add it to the artist's 'albums' array
      // this will only store the album's _id, even though we're pushing the entire album object:
      user.paths.push(newPath)
      // then save the artist and respond to the client with JSON data:
      user.save(function(err) {
        if(err) return console.log(err)
        res.json(user)
      })
    })
  })
})

// SIGN UP AND SIGN IN ===============================

userRouter.route('/login')
 .get(function(req, res){
   res.render('login', {message: req.flash('loginMessage')})
 })
 .post(passport.authenticate('local-login', {
   successRedirect:'/profile',
   failureRedirect: '/login'
 }))

userRouter.route('/signup')
 .get(function(req, res){
   res.render('signup', {message: req.flash('signup')})
 })
 .post(passport.authenticate('local-signup', {
   // TODO save the user to mongodb here
   successRedirect: '/profile',
   failureRedirect: '/signup'
 }))

userRouter.get('/profile', isLoggedIn, function(req, res){
     res.render('profile', {user: req.user})
   })

userRouter.get('/logout', function(req,res){
  req.logout()
  res.redirect('/')
})

userRouter.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}))

userRouter.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
}))

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}

// =============================================


// not sure about how to get descriptions from blips
// testRouter.get('/blip')
// res.render('/blipInfo', {user: req.user})


module.exports = userRouter
