const mongoose = require('mongoose');
const Events = require("../models/events");


const getEvents = async (req, res) => {
    try {
        const fetchEvents = await Events.find();
        console.log("PostEvents=----", fetchEvents);
        setTimeout(() => {
            res.status(200).json(fetchEvents);
        }, 500)
        
    } catch(error) {
        res.status(404);
        res.json({ message: error.message});
    }
}
const createEvents = async (req, res) => {
    const {title, message, tags, selectedFile } = req.body;
    console.log("req.body=----", req.body);
    if(!req.userId) return res.status(401).send({message: 'unauthenticated user'});
    const newEvents = new Events({title, message, creatorEmail: req.email, creator: `${req.firstName} ${req.lastName}`,tags, selectedFile });
    
    try {
        await newEvents.save();
        res.status(200).json(newEvents);
    } catch(error) {
        res.status(409);
        res.status(409).json({error: error});
    }
}

const deleteEvents = async (req, res) => {
    try {
        const {id } = req.params;
        if(!req.userId) return res.status(401).send("unauthorized user");
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        const event = await Events.findById(id);
        if(event.creatorEmail !== req.email) return res.status(403).send({message: "user doesnot have permission to delete this event"})

        // const deletedEvents = await Events.findByIdAndRemove(id);
        const deletedEvents = await Events.findOneAndDelete({_id: id})
        console.log("deletedEvents", deletedEvents)

        res.json(deletedEvents);
    } catch (error) {
        res.status(409).json({error: error});
    }
}

const updateEvent = async (req, res) => {
    try {
        if(!req.userId) return res.status(401).send("unauthorized user");
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`no event exist for id ${id}`);

        const { title, message} = req.body;
        const updatedEvent = await Events.findByIdAndUpdate(id, {title, message, _id:id}, {new: true});
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(409).json({error: error});
    }
}

const likeEvent = async (req, res) => {
    const { id } = req.params;
    if(!req.userId) return res.status(401).send("unauthorized user");
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`no event exist for id ${id}`);

    const event = await Events.findById(id);
    // const event
    // if(event)
    let index = event.likes.findIndex(item => item === String(req.userId));
    if(index === -1) {
        event.likes.push(req.userId);
    } else {
        event.likes = event.likes.filter( item => item !== String(req.userId));
    }

    const updatedEvent = await Events.findByIdAndUpdate(id, event, {new: true});
    res.status(200).json(updatedEvent);
}

module.exports = {getEvents, createEvents, deleteEvents, updateEvent, likeEvent};