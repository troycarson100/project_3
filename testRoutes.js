var
 express = require('express'),
 passport = require('passport'),
 testRouter = express.Router()

 testRouter.route('/login')
   .get(function(req, res){
     res.render('login')
   })
   .post(passport.authenticate('local-login', {
     successRedirect:'/profile',
     failureRedirect: '/login'
   }))

   testRouter.route('/signup')
     .get(function(req, res){
       res.render('signup', {message: req.flash('signup')})
     })
     .post(passport.authenticate('local-signup', {
       successRedirect: '/profile',
       failureRedirect: '/signup'
     }))

 testRouter.get('/profile', isLoggedIn, function(req, res){
       res.render('profile', {user: req.user})
     })

//not sure about how to get descriptions from blips
     testRouter.get('/blip')
      res.render('/blipInfo', {user: req.user})


     testRouter.get('/logout', function(req, res){
       req.logout()
       res.redirect('/')
     })

     function isLoggedIn(req, res, next){
       if(req.isAuthenticated()) return next()
       res.redirect('/')
     }


 module.exports = testRouter
