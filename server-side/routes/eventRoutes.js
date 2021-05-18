const {getEvents, createEvents, deleteEvents, updateEvent, likeEvent} = require('../controllers/events');
const authMiddleware = require("../middleware/auth");

const eventRoutes = (app) => {

    app.get('/api/events', getEvents);
    app.post('/api/events', authMiddleware, createEvents);
    app.delete('/api/events/:id', authMiddleware, deleteEvents);
    app.patch('/api/events/:id', authMiddleware, updateEvent);
    app.patch('/api/events/likeevent/:id', authMiddleware, likeEvent);
}

module.exports = eventRoutes;