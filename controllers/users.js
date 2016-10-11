var User = require('../models/User.js')

module.exports = {
  index,
  create,
  show,
  // update, waiting for troys new code
  destroy
}

function index(req,res){
  User.find({}, function(err, users){
    if(err) return console.log(err)
    res.json(users)
  }

function create(req,res){
  User.create(req.body, function(err, user){
    if(err) return console.log(err)
    res.json({success: true, user: user})
  }

function show(req,res){
  // When we find the user by _id, we replace its 'Path' array with an array of ACTUAL complete path objects using .populate()
  // THEN we execute the callback which sends the populated user to the client:
 User.findById(req.params.id).populate('paths').exec(function(err, user){
   if(err) return console.log(err)
   res.json(user)
   })
 }

// TROYS NEW PATCH CODE GOES HERE
// function update(req, res){
//  User.findByIdAndUpdate(req.param.id, req.body, {new: true}, function(err, user){
//    if(err) return console.log(err)
//    // user.update({ name : user.name })
//    res.json(user)
//  })
// }

function destroy(req,res){
    User.findByIdAndRemove(req.user._id, function(err){
      if(err) return console.log(err)
      Path.remove({_by: req.user._id}, function(err){
        if(err) return console.log(err)
        res.redirect('/logout')
      })
    })
  }

// I also left the login/logout functions in the router itself, because they are short / I'm afraid to move them :) - ALEX
