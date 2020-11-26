const path = require('path')
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

// Connections To mongo DB
// const mongoDB = require('./config/dbConnect')
// const {dbConnection} = require('./config/dbConnect')
// mongoDB()
// dbConnection()

// GRIDFS Setup
const GridStream = require('gridfs-stream')
const GridFsStrorage = require('multer-gridfs-storage')
const multer = require('multer')
const crypto = require("crypto")

require('dotenv').config({ path : './config/config.env'})

const apiRoute = require('./routes/apiRoutes')
const uiRoute = require("./routes/index")
const { rejects } = require('assert')

// Body parser middleware for express
app.use(express.json())

// API call from backend
app.use("/api", apiRoute)

// UI call from frontend
app.use("/ui", uiRoute)

// sensor API call from hardware
// app.use("/sensor", require("./routes/sensorRoutes"))

// Static folder
app.use(express.static(path.join(__dirname, "public")))

app.engine(".hbs", exphbs({defaultLayout: "main", extname: ".hbs"}))
app.set("view engine", ".hbs")


// Connect to database

let gfs;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
const conn = mongoose.connection
conn.once("open", () => {
            gfs = GridStream(conn.db, mongoose.mongo)
            gfs.collection("uploads")
})

// Create Storage Engine
const storage = new GridFsStrorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if(err) {
                    return reject(err)
                }
                const filename = buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads"
                }
                resolve(fileInfo)
            })
        })
    }
})

const upload = multer({storage})

// GET Request to /
// Open the upload Form
app.get('/', (req, res) => {
    res.render('login', {layout: "login"})
})

// reference to sensorData Mongoose Model
const sensorData = require('./model/SensorData')

// POST Request to /upload
// Upload A File
app.post ('/upload', upload.fields([{name: 'imageFile', maxCount: 1}, {name: 'audioFile', maxCount: 1}]), (req, res) => {
// app.post('/upload', upload.single('file'), (req, res) => { 
    const sensorReadings = new sensorData({
        temp: req.body.temp,
        pitch: req.body.pitch,
        image: req.files.imageFile._id,
        audio: req.files.audioFile._id
    })
    sensorReadings.save().then((resData) => {
        res.json(
                [
                    {sensor: resData},
                    {file: req.file}
                ]
            )
    })
})

// GET Request to /file
// GET All Image Files
app.get('/files/image', (req, res) => {
    gfs.files.find({contentType: "image/jpeg" || "image/png"}).toArray((err, files) => {
        if(!files || files.length === 0) {
            return res.status(404).json({
                err: "No files exist"
            })
        }
        res.json({
            length: files.length,
            files: files
        })
    })
})

// GET Request to /file
// GET All Audio Files
app.get('/files/audio', (req, res) => {
    gfs.files.find({contentType: "audio/mpeg"}).toArray((err, files) => {
        if(!files || files.length === 0) {
            return res.status(404).json({
                err: "No files exist"
            })
        }
        res.json({
            length: files.length,
            files: files
        })
    })
})



// GET Request to /file
// Get A Single Media File
app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if(!file || file.length === 0){
            return res.status(404).json({
                err: "No File Exist"
            })
        }
        res.json(file)
    })
})

// GET Request to /file
// Display a Single Media File
app.get('/files/recieve/:filename', (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if(!file || file.length === 0){
            return res.status(404).json({
                err: "No File Exist"
            })
        }
        try{
            const readStream = gfs.createReadStream(file.filename)
            readStream.pipe(res)
        }catch(err){
            res.status(400).json({err: "Unable to recieve media file from server"})
        }
        // res.json(file)
    })
})

// GET Request to /file
// GET All Media Files
app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if(!files || files.length === 0) {
            return res.status(404).json({
                err: "No files exist"
            })
        }
        res.json({
            length: files.length,
            files: files
        })
    })
})



// GET All Sensor Data
app.get('/sensor', (req, res) => {
    sensorData.find().then(resData => {
        if(resData.length === 0){
            return res.status(404).json({err: "No Files Found"})
        }
        res.status(200).json(resData)
    }).catch(err => {
        res.json({error: err})
    })
})

// GET single sensor Reading
app.get('/sensor/:_id', (req, res) => {
    sensorData.findOne({_id: req.params._id}, (err, senseData) => {
        if(!senseData || senseData.length === 0){
            return res.status(404).json({
                err: "No Such File Exists"
            })
        }
        res.json(senseData)
    })
})

// 
// Deleting a Single Media File
app.delete('/files/delete/:_id', (req, res) => {
    gfs.remove({_id: req.params._id, root: "uploads"}, (error, gridStore) => {
        if(error){
            return res.status(404).json({err: error})
        }
        res.json({msg: "Delete Successful"})
    })
})

//
// Deleting a single sensor value
app.delete('/sensor/:_id', (req, res) => {
    sensorData.remove({_id: req.params._id}, (err, senseData) => {
        if(err){
            return res.status(404).json({
                err: "No Such File Exists"
            })
        }
        res.status(200).json({msg: "Sensor Data successfully Deleted"})
    })
})

const port = process.env.PORT || 4000
app.listen(port, console.log(`Server Started on port ${port}`))