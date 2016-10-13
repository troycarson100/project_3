var
  express = require('express'),
  pathsRouter = express.Router(),
  Path = require('../models/Path.js'),
  User = require('../models/User.js')


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


pathsRouter.route('/paths/:id/delete')
  // .delete?
  .get(function(req, res){
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
  })


// post Path's blips:
pathsRouter.route('/paths/:id/blips')
  .get(function(req, res) {
    Path.findById(req.params.id, function(err, path) {
      if(err) return console.log(err)
      res.json(path.blips)
    })
  })
  .post(function(req, res) {
    Path.findById(req.params.id, function(err, path) {
      if(err) return console.log(err)
      path.blips.push(req.body)
      path.save(function(err) {
        if(err) return console.log(err)
        res.json(path)
      })
    })
  })

// Specific blip from an path:
pathsRouter.route('/paths/:pathId/blips/:blipId')
  .get(function(req, res) {
    Path.findById(req.params.pathId, function(err, path) {
      if(err) return console.log(err)
      res.json(path.blips.id(req.params.blipId))
    })
  })
  .delete(function(req, res) {
    Path.findById(req.params.pathId, function(err, path) {
      if(err) return console.log(err)
      path.blips.id(req.params.blipId).remove()
      path.save(function(err) {
        if(err) return console.log(err)
        res.json(path)
      })
    })
  })
  .patch(function(req, res){
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
  })

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



module.exports = pathsRouter
