var Path = require('../models/Path.js')

module.exports = {
  index,
  create,
  show,
  destroy
}

function index(req, res) {
  Path.find({}, function(err, paths) {
    if(err) return console.log(err)
    res.json(paths)
  })
}

function create(req, res){
  // This finds the current user by their id
  User.find(currentUser.id , function(err, user){
    // creates a new unsaved path with the body in the request
    var newPath = new Path(req.body)
    // gives that path a _by property of the user's id
    newPath._by = user
    // saves that path
    newPath.save(function(err, path){
      // pushes this path id in the user object's paths property
      user.paths.push(path)
      // then saves the current user object
      user.save(function(err, user){
        // and responds to the client with the user object
        res.json(user)
      })
    })
  })
}

function show(req, res) {
  Path.findById(req.params.id).populate('blips').exec(function(err, path) {
    if(err) return console.log(err)
    res.json(path)
  })
}

function destroy(req, res){
    Path.findByIdAndRemove(req.params.id, function(err){
      if(err) return console.log(err)
      User.findById(req.user._id, function(err, user){
        if(err) return console.log(err)
        user.update({$pull: {paths: req.params.id}}, function(err){
          if(err) return console.log(err)
          res.redirect('/profile')
        })
      })
    })
}
