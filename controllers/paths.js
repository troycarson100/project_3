var Path = require('../models/Path.js')

module.exports = {
  index,
  create,
  show,
  destroy,
  indexBlip,
  createBlip,
  showBlip,
  destroyBlip,
  updateBlip
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

function indexBlip(req, res) {
  Path.findById(req.params.id, function(err, path) {
    if(err) return console.log(err)
    res.json(path.blips)
  })
}

function createBlip(req, res) {
  Path.findById(req.params.id, function(err, path) {
    if(err) return console.log(err)
    path.blips.push(req.body)
    path.save(function(err) {
      if(err) return console.log(err)
      res.json(path)
    })
  })
}

function showBlip(req, res) {
  Path.findById(req.params.pathId, function(err, path) {
    if(err) return console.log(err)
    res.json(path.blips.id(req.params.blipId))
  })
}

function destroyBlip(req, res) {
  Path.findById(req.params.pathId, function(err, path) {
    if(err) return console.log(err)
    path.blips.id(req.params.blipId).remove()
    path.save(function(err) {
      if(err) return console.log(err)
      res.json(path)
    })
  })
}

function updateBlip(req, res){
  Path.findById(req.params.pathId, function(err, path) {
    // res.json(path.blips)
    if(err) return res.json(err)
    // // path.blips.id(req.params.blipId).update()
    path.blips.forEach(function(blip){
      if (blip._id == req.params.blipId){
        blip.title = req.body.title
        path.save(function(err){
          if(err) return res.json(err)
          res.json(path)
        })
      }
    })
  })
}
