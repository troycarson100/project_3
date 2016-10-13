var
 express = require('express'),
 passport = require('passport'),
 userRouter = express.Router(),
 User = require('../models/User.js'),
 Path = require('../models/Path.js')
 userController = require('../controllers/users.js')

// BASIC USER ROUTES ===================================

 // index of all users:
userRouter.get('/users', userController.index)

// get a single user:
userRouter.get('/users/:id', userController.show)

// delete a user:
userRouter.get('/profile/delete', userController.destroy)

// update a single user
userRouter.patch('/profile', userController.update)

// creates a path through the user id
userRouter.post('/users/:id/paths', userController.createPath)


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
