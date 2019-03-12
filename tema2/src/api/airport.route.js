import Router from 'router'
import * as AirportController from '../controllers/airport.controller'
const api = Router();

api.get('/', AirportController.getAirports);
api.get('/:id', AirportController.getAirport);
api.post('/', AirportController.addAirports);
api.put('/:id', AirportController.updateAirports);
api.delete('/:id', AirportController.deleteAirports);

export default api

