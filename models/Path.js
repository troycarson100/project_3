var mongoose = require('mongoose')


var blipSchema = mongoose.Schema({
  title : {type: String, required: true},
  description: {type: String},
  link: {type: String},
  kind: {type: String},
  year: {type: Number}
})

var pathSchema = mongoose.Schema({
  _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: {type: String, required: true},
  category: {type: String, required: true},
  blips: [blipSchema]
})

var Path = mongoose.model('Path', pathSchema)

module.exports = Path
