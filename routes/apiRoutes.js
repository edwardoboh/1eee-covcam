const express = require('express')
const router = express.Router()
const patientData = require("../model/PatientData")

// @desc    API GET Request
// @route   /api
router.get("/", (req, res) => {
    res.send("welcome to the api route")
})

// @desc    API POST Request to get all users
// @route   /api/user
router.get("/user", (req, res) => {
    patientData.find({}, (err, data) => {
        if(err){
            return res.json({err: err})
        }
        // console.log(data)
        res.json(data)

    })
        
})

// @desc    API POST Request to create new user
// @route   /api/user
router.post("/user", (req, res) => {
    console.log(req.body)
    res.json(req.body)

    const newPatient = new patientData({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        imageURL: req.body.imageURL,
        sex: req.body.sex,
        age: req.body.age
    })

    try{
        newPatient.save()
    }catch(error){
        console.log("Unable to save new record")
        console.log(error)
    }
})

module.exports = router