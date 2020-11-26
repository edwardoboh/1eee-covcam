const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patientSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateCaptured: {
        type: Date,
        default: Date.now
    },
    imageURL: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
})

module.exports = mongoose.model("Patient", patientSchema)