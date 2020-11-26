const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SensorSchema = new Schema({
    temp: {
        type: String,
        required: true
        
    },
    pitch: {
        type: String,
        required: true
    },
    image: {
        type: Schema.Types.ObjectId
    },
    audio: {
        type: Schema.Types.ObjectId
    },
    uploadTime: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("sensor", SensorSchema)