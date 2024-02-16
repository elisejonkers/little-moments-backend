const router = require("express").Router()
const Event = require("../models/Event.model")

router.get("/events", (req, res, next) => {
    
    Event.find({}) //ADD CREATED BY USER
    .then((eventsArr) => {
        res.status(200).json(eventsArr)
    })
    .catch((error) => {
        next(error)
    })
})

router.get("/events/:eventId", (req, res, next) => {
    const { eventId } = req.params
    
    Event.findById(eventId)
    .then((eventDetails) => {
        res.status(200).json(eventDetails)
    })
    .catch((error) => {
        next(error)
    })
})

router.post("/events", (req, res, next) => {
    console.log("this is post events")
    const { category, title, date, description } = req.body

    const newRequestBody = {
        category,
        title,
        date,
        description
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

router.put("/events/:eventId", (req, res, next) => {
    const { eventId } = req.params
    const { category, title, date, description } = req.body
    const newRequestBody = {
        category,
        title,
        date,
        description
    }

    Event.findByIdAndUpdate(eventId, {...newRequestBody}, {new: true}) //ADD CREATED BY USER
    .then((updatedEvent) => {
        res.status(200).json(updatedEvent)
    })
    .catch((error) => {
        next(error)
    })
})

router.delete("/events/:eventId", (req, res, next) => {
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