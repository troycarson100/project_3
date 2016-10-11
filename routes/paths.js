var
  express = require('express'),
  pathsRouter = express.Router(),
  Path = require('../models/Path.js'),
  User = require('../models/User.js')


// Path ROUTES:
pathsRouter.route('/paths')
  .get(function(req, res) {
    Path.find({}, function(err, paths) {
      if(err) return console.log(err)
      res.json(paths)
    })
  })
  .post(function(req, res){
    // This finds the first test user, to be replaced with req.user.local._id when passport is integrated to use the currently logged in user instead.
    User.findOne({}, function(err, user){
      //if(err) return console.log(err)
      var newPath = new Path(req.body)
      console.log(req.body)
      newPath._by = user
      newPath.save(function(err, path){
        console.log("This is path: " + path)
        //TO - DO!!!!!!!!!!!! DEFINE PATH, IT IS UNDEFINED!!!!!!!!!!!!! RECEIVING NULL!!!!!!
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
    Path.findById(req.params.id).populate('blips').exec(function(err, path) {
      if(err) return console.log(err)
      res.json(path)
    })
  })

pathsRouter.route('/paths/:id/delete')
  .get(function(req, res){
    User.findById(req.user._id,function(err, user){
      if(err) return console.log(err)
      user.paths.id(req.params.id).remove()
      user.save(function(err){
        if(err) return console.log(err)
        Path.findByIdAndRemove(req.params.id, function(err){
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

module.exports = pathsRouter
