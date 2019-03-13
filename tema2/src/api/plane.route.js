import Router from 'router'
import * as PlaneController from '../controllers/plane.controller.js'
import { checkContent } from '../validators/contentValidator'

const api = Router({ mergeParams: true })

api.get('/', PlaneController.getPlanes)
api.get('/:id', PlaneController.getPlane)
api.post('/', checkContent, PlaneController.addPlanes)
api.put('/', checkContent, PlaneController.updatePlanes)
api.put('/:id', checkContent, PlaneController.updatePlane)
api.delete('/:id', checkContent, PlaneController.deletePlanes)

export default api
