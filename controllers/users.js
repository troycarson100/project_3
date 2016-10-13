var User = require('../models/User.js')
var Path = require('../models/Path.js')

module.exports = {
  index,
  show,
  update,
  destroy,
  createPath
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

function createPath(req, res){
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
}
// I left the login/logout functions in the router itself, because they are short / I'm afraid to move them :) - ALEX
