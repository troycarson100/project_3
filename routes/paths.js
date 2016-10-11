var
  express = require('express'),
  pathsRouter = express.Router(),
  Path = require('../models/Path.js'),
  User = require('../models/User.js'),
  pathsController = require('../controllers/paths.js')

// ====================================================


// PATH ROUTES

// show all paths:
pathsRouter.get('/paths', pathsController.index)
// create a new path:
pathsRouter.post('/paths', pathsController.create)
// show a single path:
pathsRouter.get('/paths/:id', pathsController.show)
// delete a path: - should be destroy?
pathsRouter.get('/paths/:id/delete', pathsController.destroy)

// BLIP ROUTES

// index of all blips on specific path:
pathsRouter.get('/paths/:id/blips', pathsController.indexBlip)
// create a new blip on a specific path:
pathsRouter.post('/paths/:id/blips', pathsController.createBlip)
// show a specific blip from a specific path:
pathsRouter.get('/paths/:pathId/blips/:blipId', pathsController.showBlip)
// delete a specific blip from a specific path:
pathsRouter.delete('/paths/:pathId/blips/:blipId', pathsController.destroyBlip)
// update a specific blip on a specific path
pathsRouter.patch('/paths/:pathId/blips/:blipId', pathsController.updateBlip)

// ====================================================

module.exports = pathsRouter
