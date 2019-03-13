import mongoose from 'mongoose'

let planeSchema = mongoose.Schema({}, { strict: false })

let Plane = mongoose.model('Plane', planeSchema)

export default Plane
