var
  express = require('express'),
  pathsRouter = express.Router(),
  Path = require('../models/Path.js'),
  User = require('../models/User.js'),
  pathsController = require('../controllers/paths.js')

// ====================================================

<<<<<<< HEAD
// Path ROUTES:
pathsRouter.route('/paths')
  .get(function(req, res) {
    Path.find({}).populate('_by').exec(function(err, paths) {
    // Path.find({}, function(err, paths) {
      if(err) return console.log(err)
      //This line changed by troy!
      res.render('paths', {paths})
    })
  })
  .post(function(req, res){
    // This finds the first test user, to be replaced with req.user.local._id when passport is integrated to use the currently logged in user instead.
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
  })
=======
>>>>>>> 7026ed288c06f65bc493ed420d40fdbba6095907

// PATH ROUTES

<<<<<<< HEAD
// Single Path:
pathsRouter.route('/paths/:id')
  .get(function(req, res) {
    Path.findById(req.params.id).populate('_by').exec(function(err, path) {
      if(err) return console.log(err)
      var blips = path.blips.concat()
      blips = blips.sort(function(obj1, obj2) {
        return obj2.year - obj1.year
      })
      //This line changed by troy!
      res.render('path', {path, blips})
      // res.json(path)
    })
  })
=======
// show all paths:
pathsRouter.get('/paths', pathsController.index)
// create a new path:
pathsRouter.post('/paths', pathsController.create)
// show a single path:
pathsRouter.get('/paths/:id', pathsController.show)
// delete a path: - should be destroy?
pathsRouter.get('/paths/:id/delete', pathsController.destroy)
>>>>>>> 7026ed288c06f65bc493ed420d40fdbba6095907

// BLIP ROUTES

// index of all blips on specific path:
pathsRouter.get('/paths/:id/blips', pathsController.indexBlip)
// create a new blip on a specific path:
pathsRouter.post('/paths/:id/blips', pathsController.createBlip)
// show a specific blip from a specific path:
pathsRouter.get('/paths/:pathId/blips/:blipId', pathsController.showBlip)
// delete a specific blip from a specific path:
pathsRouter.delete('/paths/:pathId/blips/:blipId', pathsController.destroyBlip)
// update a specific blip on a specific path
pathsRouter.patch('/paths/:pathId/blips/:blipId', pathsController.updateBlip)

<<<<<<< HEAD
// Search paths route
pathsRouter.post("/search", function(req, res) {
  // converts search term to a regex object / "i" allows case insensitivity
  var rx = new RegExp(req.body.name, "i")
    // finds a path with a name that matches the search term
    Path.find({"name": rx}, function(err,data){
      if(err) return res.json(err)
      // returns that data to the client as a json object
      res.json(data)
    })
  })

// Search blips route
pathsRouter.post("/blips/search", function(req, res) {
  var rx = new RegExp(req.body.title, "i")
    // looks within all paths for blips whose name matches the search term 
    Path.find({"blips.title": rx}, function(err,paths){
      res.json(paths)
    })
  })


=======
// ====================================================
>>>>>>> 7026ed288c06f65bc493ed420d40fdbba6095907

module.exports = pathsRouter
