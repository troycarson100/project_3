var mongoose = require('mongoose')

var blipSchema = mongoose.Schema({
  title : {type: String, required: true},
  link: {type: String, required: true},
  description: {type: Text, required: true},
  img: {type: String},
  type: {type: String},
  duration: {type: Number},
  tag: [{type: String}],
  // I think this number will be generated via a
  // search in the routes, then rendered in ejs...
  // timesUsed: {type: Numer}
})

var pathSchema = mongosoe.Schema({
  _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: {type: String, reqiuired: true},
  year: {type: Number},
  blips: [blipSchema]
})
