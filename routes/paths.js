var
  express = require('express'),
  pathsRouter = express.Router(),
  Path = require('../models/Path.js'),
  User = require('../models/User.js')
  pathsController = require('../controllers/paths')


// PATH ROUTES =============================

// show all paths
pathsRouter.get('/paths', pathsController.index)
// make a new path
pathsRouter.post('/paths', pathsController.create)
// show a specific path
pathsRouter.get('/paths/:id', pathsController.show)
// delete a specific path
pathsRouter.get('/paths/:id/delete', pathsController.destroy)
// Search paths
pathsRouter.post("/search", pathsController.search)
// Search paths by their blips
pathsRouter.post("/blips/search", pathsController.searchPathByBlips)



// PATH'S BLIPS ROUTES =====================

// show all blips on a specific path
pathsRouter.get('/paths/:id/blips', pathsController.indexBlip)
// make a new blip on a specific path
pathsRouter.post('/paths/:id/blips', pathsController.createBlip)
// show a specific blip on a specific path
pathsRouter.get('/paths/:pathId/blips/:blipId', pathsController.showBlip)
// delete a specific blip on a specific path
pathsRouter.delete('/paths/:pathId/blips/:blipId', pathsController.destroyBlip)
// update a specific blip on a specific path
pathsRouter.patch('/paths/:pathId/blips/:blipId', pathsController.updateBlip)

// =========================================

module.exports = pathsRouter
