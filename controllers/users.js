var
  express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  User = require('./models/User.js')

  mongoose.connect('mongodb://localhost/project-3', function(err){
    if(err) return console.log(err)
    console.log("Connected")
  })

  //MIDDLEWARE missing
  app.use(bodyParser.json)


//path routes
app.route('/paths/:id')
  .get(function(req, res){
    Path.findById(req.params.id, function(err, path){
      if(err) return console.log(err)
      res.json(path)
    })
  })

  app.route('/paths/:id/blip')
  .get(function(req, res){
    Path.findById(req, params.id,
    function(err, blip){
      if(err) return console.log(err)
      res.json(path.blip)
    })
  })
