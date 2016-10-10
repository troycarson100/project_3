var mongoose = require('mongoose')


var blipSchema = mongoose.Schema({
  title : {type: String, required: true}
  // link: {type: String},
  // description: {type: String},
  // img: {type: String},
  // kind: {type: String},
  // duration: {type: Number},
  // tag: [{type: String}],
  // I think this number will be generated via a
  // search in the routes, then rendered in ejs...
  // timesUsed: {type: Numer}
})

var pathSchema = mongoose.Schema({
  _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: {type: String, required: true},
  // year: {type: Number},
  blips: [blipSchema]
})

var Path = mongoose.model('Path', pathSchema)

module.exports = Path
