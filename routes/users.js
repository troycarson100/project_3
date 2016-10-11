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

//  ===================================================

module.exports = userRouter
