var
 express = require('express'),
 passport = require('passport'),
 userRouter = express.Router(),
 User = require('../models/User.js'),
 Path = require('../models/Path.js'),
 usersController = require('../controllers/users.js')

// ====================================================

 // index of all users:
userRouter.get('/users', usersController.index)

// get a specific user:
userRouter.get('/users/:id', usersController.show)

<<<<<<< HEAD
// Does this belong in the path router? - ALEX
userRouter.route('/users/:id/paths')
.post(function(req, res) {
  console.log(req)
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
        res.redirect('/paths/'+newPath._id)
      })
    })
  })
})

// delete a specific user
userRouter.delete('/profile/delete', usersController.destroy)

// edit a specific user
userRouter.patch('/profile', usersController.update)

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
