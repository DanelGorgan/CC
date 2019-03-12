import mongoose from 'mongoose'

let userSchema = mongoose.Schema({}, {strict: false})

let Airport = mongoose.model('Airport', userSchema)

export default Airport