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
  passport = require('passport')

const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(flash())

app.get('/',function(req, res){
  res.json({message: "Welcome to the Root"})
})


app.listen(PORT, function(){
  console.log("Server running on", PORT)
})
