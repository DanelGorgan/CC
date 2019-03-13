import mongoose from 'mongoose'

let airportSchema = mongoose.Schema({}, { strict: false })

let Airport = mongoose.model('Airport', airportSchema)

export default Airport
