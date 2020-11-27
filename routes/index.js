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
    const tableBodyData = [
        {
            _id: `<span style = "color: darkblue; font-weight: bold">show</span`,
            firstName: 38.1,
            lastName: `Low`,
            imageURL: `<img src="/image/img1.jpg" style="width: 80px">`,
            sex: "fruit",
            age: `<i class="fa fa-check" aria-hidden="true"></i>`,
            dateCaptured: "2020-11-23T14:07:32.008Z",
            __v: 0
        },
        {
            _id: `<span style = "color: darkblue; font-weight: bold">show</span`,
            firstName: 34.3,
            lastName: `Normal`,
            imageURL: `<img src="/image/img2.jpg" style="width: 80px">`,
            sex: "fruit",
            age: `<i class="fa fa-check" aria-hidden="true"></i>`,
            dateCaptured: "2020-11-23T14:07:32.008Z",
            __v: 0
        },
        {
            _id: `<span style = "color: darkblue; font-weight: bold">show</span`,
            firstName: 35.8,
            lastName: `Low`,
            imageURL: `<img src="/image/img3.jpg" style="width: 80px">`,
            sex: "fruit",
            age: `<i class="fa fa-check" aria-hidden="true"></i>`,
            dateCaptured: "2020-11-23T14:07:32.008Z",
            __v: 0
        },
        {
            _id: `<span style = "color: darkblue; font-weight: bold">show</span`,
            firstName: 36.4,
            lastName: `Low`,
            imageURL: `<img src="/image/img4.jpg" style="width: 80px">`,
            sex: "fruit",
            age: `<i class="fa fa-check" aria-hidden="true"></i>`,
            dateCaptured: "2020-11-23T14:07:32.008Z",
            __v: 0
        }        
    ]
    res.render("sensor", {allData: tableBodyData})
})

// @desc    Sensors Page
// @route   /sensor

router.get("/demo", (req, res) => {
    res.render("demo")
})

// @desc    imageUpload Page
// @route   /image

router.get("/image", (req, res) => {
    res.render("imageUpload")
})

module.exports = router