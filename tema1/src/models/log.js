import mongoose from 'mongoose'

let logSchema = mongoose.Schema({}, { strict: false })

let Log = mongoose.model('Log', logSchema)

export default Log
