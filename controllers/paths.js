var Path = require('../models/Path.js')

module.exports = {
  index,
  create,
  show,
  destroy,
  search,
  indexBlip,
  createBlip,
  showBlip,
  destroyBlip,
  updateBlip,
  searchPathByBlips
}

// show all paths
function index(req, res) {
    Path.find({}).populate('_by').exec(function(err, paths) {
      if(err) return console.log(err)
      res.render('paths', {paths})
    })
  }

// make a new path
function create(req, res){
    User.find(currentUser.id , function(err, user){
      var newPath = new Path(req.body)
      newPath._by = user
      newPath.save(function(err, path){
        user.paths.push(path)
        user.save(function(err, user){
          res.json(user)
        })
      })
    })
  }

// show a specific path
function show(req, res){
    Path.findById(req.params.id).populate('_by').exec(function(err, path) {
      if(err) return console.log(err)
      var blips = path.blips.concat()
      blips = blips.sort(function(obj1, obj2) {
        return obj2.year - obj1.year
      })
      res.render('path', {path, blips})
    })
  }

// delete a path
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

// Search a path
function search(req, res){
  // converts search term to a regex object / "i" allows case insensitivity
  var rx = new RegExp(req.body.name, "i")
    // finds a path with a name that matches the search term
    Path.find({"name": rx}, function(err,data){
      if(err) return res.json(err)
      // returns that data to the client as a json object
      res.json(data)
    })
  }

// show all blips
function indexBlip(req, res) {
  Path.findById(req.params.id, function(err, path) {
    if(err) return console.log(err)
    res.json(path.blips)
  })
}

// make a new blip
function createBlip(req, res) {
    Path.findById(req.params.id, function(err, path){
      if(err) return console.log(err)
      path.blips.push(req.body)
      path.save(function(err) {
        if(err) return console.log(err)
        res.json(path)
      })
    })
  }

// show a specific blip
function showBlip(req, res) {
  Path.findById(req.params.pathId, function(err, path) {
    if(err) return console.log(err)
    res.json(path.blips.id(req.params.blipId))
  })
}

// delete a specific blip
function destroyBlip(req, res) {
  Path.findById(req.params.pathId, function(err, path) {
      Path.findById(req.params.pathId, function(err, path) {
        if(err) return console.log(err)
        path.blips.id(req.params.blipId).remove()
        path.save(function(err) {
          if(err) return console.log(err)
          res.json(path)
        })
      })
    })
  }

// update a specific blip
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

// search for a path by its blips
function searchPathByBlips(req, res) {
  var rx = new RegExp(req.body.title, "i")
    // looks within all paths for blips whose name matches the search term
    Path.find({"blips.title": rx}, function(err,paths){
      res.json(paths)
    })
  }
