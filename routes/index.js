const express = require('express')
const router = express.Router()
const patientData = require('../model/PatientData')

// @desc    Dashboard Page
// @route   /dashboard

router.get("/dashboard", (req, res) => {
    res.render("dashboard")
})

// @desc    Login Page
// @route   /login

router.get("/login", (req, res) => {
    res.render("login", {layout: "login"})
})

// @desc    demo Page
// @route   /settings

router.get("/settings", (req, res) => {
    
    res.render("settings")
})

// @desc    Table Page
// @route   /table

router.get("/table", (req, res) => {
    // const sendData = () => {
    //     return [
    //         {
    //             _id: "5fbbc22442c411ac60bc4e34",
    //             firstName: "Apple",
    //             lastName: "Pie",
    //             imageURL: "http://localhost:4000/api/user",
    //             sex: "fruit",
    //             age: 23,
    //             dateCaptured: "2020-11-23T14:07:32.008Z",
    //             __v: 0
    //         },
    //         {
    //             _id: "5fbbc22442c411ac60bc4e34",
    //             firstName: "orange",
    //             lastName: "Pie",
    //             imageURL: "http://localhost:4000/api/user",
    //             sex: "fruit",
    //             age: 23,
    //             dateCaptured: "2020-11-23T14:07:32.008Z",
    //             __v: 0
    //         },
    //         {
    //             _id: "5fbbc22442c411ac60bc4e34",
    //             firstName: "pear",
    //             lastName: "Pie",
    //             imageURL: "http://localhost:4000/api/user",
    //             sex: "fruit",
    //             age: 23,
    //             dateCaptured: "2020-11-23T14:07:32.008Z",
    //             __v: 0
    //         },
    //         {
    //             _id: "5fbbc22442c411ac60bc4e34",
    //             firstName: "mango",
    //             lastName: "Pie",
    //             imageURL: "http://localhost:4000/api/user",
    //             sex: "fruit",
    //             age: 23,
    //             dateCaptured: "2020-11-23T14:07:32.008Z",
    //             __v: 0
    //         }        
    //     ]
    // }

    patientData.find().then((dataAll) => {
        const context = {
            sendData : dataAll.map((dataOne, index) => {
                return {
                        _id: dataOne._id,
                        firstName: dataOne.firstName,
                        lastName: dataOne.lastName,
                        imageURL: dataOne.imageURL,
                        sex: dataOne.sex,
                        age: dataOne.age,
                        dateCaptured: dataOne.dateCaptured,
                        index: index + 1 
                }
            })
        }
        res.render("table", {allData: context.sendData})
    }).catch(err => res.status(500).send(err))

})

// @desc    Sensors Page
// @route   /sensor

router.get("/sensor", (req, res) => {
    res.render("sensor")
})

// @desc    imageUpload Page
// @route   /image

router.get("/image", (req, res) => {
    res.render("imageUpload")
})

module.exports = router