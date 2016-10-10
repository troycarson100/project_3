var
  app = require('express')(),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  passport = require('passport'),
  userRoutes = require('./routes/users.js'),
  pathRoutes = require('./routes/paths.js')

const PORT = process.env.PORT || 3000

mongoose.connect('mongodb://localhost/project_3', function(err){
	if(err) return console.log(err)
	console.log("Connected to MongoDB")
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(flash())


app.get('/',function(req, res){
  res.json({message: "Welcome to the Root"})
})

app.use('/', userRoutes)
app.use('/', pathRoutes)


app.listen(PORT, function(){
  console.log("Server running on", PORT)
})
