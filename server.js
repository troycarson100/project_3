var
  dotenv = require('dotenv').load({silent: true}),
  express = require('express'),
  app = express(),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session)
  passport = require('passport'),
  userRoutes = require('./routes/users.js'),
  pathRoutes = require('./routes/paths.js'),
  passportConfig = require('./config/passport.js')


const PORT = process.env.PORT || 3000
const mongoConnectionString=process.env.MONGO_URL


mongoose.connect(mongoConnectionString, function(err){
	if(err) return console.log(err)
	console.log("Connected to MongoDB")
})

app.use(logger('dev'))
app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// ejs middelware
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.static('public'))
app.use(flash())
// session + passport middleware
app.use(session({
  secret: "pathlyfe4lyfe",
  cookie: {maxAge: 6000000},
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({url: mongoConnectionString})
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next){
	if(req.user) req.app.locals.currentUser = req.user
	req.app.locals.loggedIn = !!req.user
	next()
})


app.get('/',function(req, res){
  res.render('index')
})

app.get('/search', function(req, res){
  res.render('search')
})

app.use('/', userRoutes)
app.use('/', pathRoutes)


app.listen(PORT, function(){
  console.log("Server running on", PORT)
})
