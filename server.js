var
  app = require('express')()

const PORT = 3000

app.get('/',function(req, res){
  res.json({message: "Welcome to the Root"})
})

app.listen(PORT, function(err){
  if(err) return console.log(err)
  console.log("Server running on", PORT)
})
