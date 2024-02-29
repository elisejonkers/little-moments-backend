const router = require("express").Router()
const Album = require("../models/Album.model")
const Event = require("../models/Event.model")
const fileUploader = require("../config/cloudinary.config")

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

router.post("/upload", fileUploader.single("imageURL"), (req, res, next) => {
    console.log("file is: ", req.file)

    if (!req.file) {
        next (new Error ("No file uploaded!"))
        return;
    }

    res.json({fileURL: req.file.path})
})

router.post("/albums", (req, res, next) => {
    console.log("this is post albums")
    const { name, dateOfBirth, place, length, weight, imageURL } = req.body

    const newRequestBody = {
        name,
        dateOfBirth,
        place,
        length,
        weight,
        imageURL
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
    const { name, dateOfBirth, place, length, weight, imageURL } = req.body
    const newRequestBody = {
        name,
        dateOfBirth,
        place,
        length,
        weight, 
        imageURL
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

    Event.deleteMany({ album: albumId})
    .then(() => {
        console.log("associated events deleted")
        return Album.findByIdAndDelete(albumId)
    })
    .then(() => {
        console.log("album deleted")
        res.status(204).send()
    })
    .catch((error) => {
        next(error)
    })
})

module.exports = router