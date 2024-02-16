const router = require("express").Router()
const Baby = require("../models/Baby.model")

router.get("/babies", (req, res, next) => {
    console.log("this is babies", req.payload)
    Baby.find({}) //ADD CREATED BY USER
    .then((babiesArr) => {
        console.log("This is all babies", babiesArr)
        res.status(200).json(babiesArr)
    })
    .catch((error) => {
        next(error)
    })
})

router.get("/babies/:babyId", (req, res, next) => {
    const { babyId } = req.params
    
    Baby.findById(babyId)
    .then((babyDetails) => {
        res.status(200).json(babyDetails)
    })
    .catch((error) => {
        next(error)
    })
})

router.post("/babies", (req, res, next) => {
    console.log("this is post babies")
    const { name, dateOfBirth, place, length, weight } = req.body

    const newRequestBody = {
        name,
        dateOfBirth,
        place,
        length,
        weight
    }

    Baby.create({...newRequestBody}) //ADD CREATED BY USER
    .then((createdBaby) => {
        //console.log(createdBaby)
        res.status(201).json(createdBaby)
    })
    .catch((error) => {
        next(error)
    })
})

router.put("/babies/:babyId", (req, res, next) => {
    const { babyId } = req.params
    const { name, dateOfBirth, place, length, weight } = req.body
    const newRequestBody = {
        name,
        dateOfBirth,
        place,
        length,
        weight
    }

    Baby.findByIdAndUpdate(babyId, {...newRequestBody}, {new:true}) //ADD CREATED BY USER
    .then((updatedBaby) => {
        res.status(200).json(updatedBaby)
    })
    .catch((error) => {
        next(error)
    })
})

router.delete("/babies/:babyId", (req, res, next) => {
    const { babyId } = req.params
    
    Baby.findByIdAndDelete(babyId)
    .then(() => {
        console.log("baby deleted")
        res.status(204).send()
    })
    .catch((error) => {
        next(error)
    })
})

   
module.exports = router