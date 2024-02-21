const router = require("express").Router()
const Album = require("../models/Album.model")

router.get("/albums", (req, res, next) => {
    console.log("this is albums", req.payload._id)
    Album.find({createdBy: req.payload._id}) //ADD CREATED BY USER
    .then((albumsArr) => {
        res.status(200).json(albumsArr)
    })
    .catch((error) => {
        next(error)
    })
})

router.get("/albums/:albumId", (req, res, next) => {
    const { albumId } = req.params
    
    Album.findById(albumId)
    .then((albumDetails) => {
        res.status(200).json(albumDetails)
    })
    .catch((error) => {
        next(error)
    })
})

router.post("/albums", (req, res, next) => {
    console.log("this is post albums")
    const { name, dateOfBirth, place, length, weight } = req.body

    const newRequestBody = {
        name,
        dateOfBirth,
        place,
        length,
        weight
    }

    Album.create({...newRequestBody, createdBy: req.payload._id}) //ADD CREATED BY USER
    .then((createdAlbum) => {
        res.status(201).json(createdAlbum)
    })
    .catch((error) => {
        next(error)
    })
})

router.put("/albums/:albumId", (req, res, next) => {
    const { albumId } = req.params
    const { name, dateOfBirth, place, length, weight } = req.body
    const newRequestBody = {
        name,
        dateOfBirth,
        place,
        length,
        weight
    }

    Album.findByIdAndUpdate(albumId, {...newRequestBody, createdBy: req.payload._id}, {new:true}) //ADD CREATED BY USER
    .then((updatedAlbum) => {
        res.status(200).json(updatedAlbum)
    })
    .catch((error) => {
        next(error)
    })
})

router.delete("/albums/:albumId", (req, res, next) => {
    const { albumId } = req.params
    
    Album.findByIdAndDelete(albumId)
    .then(() => {
        console.log("album deleted")
        res.status(204).send()
    })
    .catch((error) => {
        next(error)
    })
})

module.exports = router