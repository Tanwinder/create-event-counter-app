const {getEvents, createEvents, deleteEvents, updateEvent, likeEvent} = require('../controllers/events');
const authMiddleware = require("../middleware/auth");
// var multer  = require('multer')
// var upload = multer()


const eventRoutes = (app) => {

    app.get('/api/events', authMiddleware, getEvents);
    app.post('/api/events', authMiddleware, createEvents);
    // app.post('/api/events', authMiddleware, upload.none(), createEvents);  //get values from new formData()
    app.delete('/api/events/:id', authMiddleware, deleteEvents);
    app.patch('/api/events/:id', authMiddleware, updateEvent);
    app.patch('/api/events/likeevent/:id', authMiddleware, likeEvent);
}

module.exports = eventRoutes;