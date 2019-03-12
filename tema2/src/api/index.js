import Router from 'router'
import airportRoutes from './airport.route'
const api = Router();

api.use('/airports', airportRoutes)

export default api

