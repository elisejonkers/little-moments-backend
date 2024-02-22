const router = require("express").Router()
const Event = require("../models/Event.model")

router.get("/albums/:albumId/events", (req, res, next) => {
    const { albumId } = req.params
    
    Event.find({album: albumId}) //ADD CREATED BY USER
    .then((eventsArr) => {
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

router.post("/albums/:albumId/events", (req, res, next) => {
    console.log("this is post events")
    const { category, title, date, description, album } = req.body

    const newRequestBody = {
        category,
        title,
        date,
        description,
        album
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
    const { category, title, date, description, albumID } = req.body
    const newRequestBody = {
        category,
        title,
        date,
        description,
        albumID
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