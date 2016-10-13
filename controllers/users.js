var User = require('../models/User.js')

module.exports = {
  index,
  // create,
  show,
  update,
  destroy
}

function index(req,res){
  User.find({}, function(err, users){
    if(err) return console.log(err)
    res.json(users)
  })
}

function show(req,res){
 // When we find the user by _id, we replace its 'Path' array with an array of ACTUAL complete path objects using .populate()
 // THEN we execute the callback which sends the populated user to the client:
 User.findById(req.params.id).populate('paths').exec(function(err, user){
   if(err) return console.log(err)
   res.json(user)
   })
 }


function update(req, res){
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
}

function destroy(req,res){
    User.findByIdAndRemove(req.user._id, function(err){
      if(err) return console.log(err)
      Path.remove({_by: req.user._id}, function(err){
        if(err) return console.log(err)
        res.redirect('/logout')
      })
    })
  }

// I left the login/logout functions in the router itself, because they are short / I'm afraid to move them :) - ALEX
