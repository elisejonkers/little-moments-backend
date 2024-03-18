const router = require("express").Router()
const Event = require("../models/Event.model")
const fileUploader = require("../config/cloudinary.config")

router.get("/albums/:albumId/events", (req, res, next) => {
    const { albumId } = req.params
    
    Event.find({album: albumId}).sort('date') //ADD CREATED BY USER
    .then((eventsArr) => {
        console.log(eventsArr)
        res.status(200).json(eventsArr)
    })
    .catch((error) => {
        next(error)
    })
})

router.get("/albums/:albumId/events/:eventId", (req, res, next) => {
    const { eventId } = req.params
    
    Event.findById(eventId)
    .then((eventDetails) => {
        res.status(200).json(eventDetails)
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

router.post("/albums/:albumId/events", (req, res, next) => {
    console.log("this is post events")
    const { category, title, date, description, album, imageURL } = req.body

    const newRequestBody = {
        category,
        title,
        date,
        description,
        album, 
        imageURL
    }

    Event.create({...newRequestBody}) //ADD CREATED BY USER
    .then((createdEvent) => {
        console.log(createdEvent)
        res.status(201).json(createdEvent)
    })
    .catch((error) => {
        next(error)
    })
})

router.put("/albums/:albumId/events/:eventId", (req, res, next) => {
    const { eventId } = req.params
    const { category, title, date, description, albumID, imageURL } = req.body
    const newRequestBody = {
        category,
        title,
        date,
        description,
        albumID, 
        imageURL
    }

    Event.findByIdAndUpdate(eventId, {...newRequestBody}, {new: true}) //ADD CREATED BY USER
    .then((updatedEvent) => {
        res.status(200).json(updatedEvent)
    })
    .catch((error) => {
        next(error)
    })
})

router.delete("/albums/:albumId/events/:eventId", (req, res, next) => {
    const { eventId } = req.params
    
    Event.findByIdAndDelete(eventId)
    .then(() => {
        console.log("event deleted")
        res.status(204).send()
    })
    .catch((error) => {
        next(error)
    })
})


module.exports = router