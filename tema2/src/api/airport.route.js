import Router from 'router'
import planeRoutes from './plane.route.js'
import * as AirportController from '../controllers/airport.controller'
import { checkContent } from '../validators/contentValidator'

const api = Router({ mergeParams: true })

api.get('/', AirportController.getAirports)
api.get('/:id', AirportController.getAirport)
api.post('/', checkContent, AirportController.addAirports)
api.put('/', checkContent, AirportController.updateAirports)
api.put('/:id', checkContent, AirportController.updateAirport)
api.delete('/:id', checkContent, AirportController.deleteAirports)

api.use('/:airportId/planes', planeRoutes)

export default api
