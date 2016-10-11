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
userRouter.route('/users/:id')
 .get(function(req,res){
  // When we find the user by _id, we replace its 'Path' array with an array of ACTUAL complete path objects using .populate()
  // THEN we execute the callback which sends the populated user to the client:
  User.findById(req.params.id).populate('paths').exec(function(err, user){
    if(err) return console.log(err)
    res.json(user)
    })
  })

  // .patch(function(req, res){
  //   User.findByIdAndUpdate(req.param.id, req.body, {new: true}, function(err, user){
  //     if(err) return console.log(err)
  //     // user.update({ name : user.name })
  //     res.json(user)
  //   })
  // })



userRouter.get('/profile/delete', function(req,res){
    User.findByIdAndRemove(req.user._id, function(err){
      if(err) return console.log(err)
      Path.remove({_by: req.user._id}, function(err){
        if(err) return console.log(err)
        res.redirect('/logout')
      })
    })
  })

// Does this belong in the path router? - ALEX
userRouter.route('/users/:id/paths')
.post(function(req, res) {
  // first find the user by its _id:
  User.findById(req.params.id, function(err, user) {
    // then create an path object (not yet saved to the database):
    var newPath = new Path(req.body)
    // store the aforementioned user's _id for this path's '_by' field:
    newPath._by = user._id
    // then save the path to the database:
    newPath.save(function(err) {
      if(err) return console.log(err)
      // once the path is stored in the db, add it to the users's 'path' array
      // this will only store the paths's _id, even though we're pushing the entire path object:
      user.paths.push(newPath)
      // then save the user and respond to the client with JSON data:
      user.save(function(err) {
        if(err) return console.log(err)
        res.json(user)
      })
    })
  })
})

// // Individual Path From User:
// userRouter.get('/users/:userId/paths/:pathId', function(req, res) {
//   User.findById(req.params.userId).populate('paths').exec(function(err, user) {
//     user.paths.select({_id: req.params.pathId}, function(err, path) {
//       res.json(path)
//     })
//   })
// })

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
   successRedirect: '/profile',
   failureRedirect: '/signup'
 }))

userRouter.get('/profile', isLoggedIn, function(req, res){
     res.render('profile', {user: req.user})
   })

userRouter.patch('/profile', function(req, res){
  User.findById(req.user._id, function(err, user){
    console.log(req.body)
    //ignore any empty form fields
    if(err) return console.log(err)
    for(key in req.body.local) {
      if(req.body.local[key]) user.local[key] = req.body.local[key]
    }
    user.save(function(err){
      res.redirect('/profile')
    })
  })
})

userRouter.get('/profile/edit', function(req, res){
  res.render('editProfile', {message: req.flash('editProfileMessage')})
})

userRouter.get('/logout', function(req,res){
  req.logout()
  res.redirect('/')
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}


module.exports = userRouter
