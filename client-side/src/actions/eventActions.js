import { GET_EVENTS_CALL, EVENTS_LOADER, POST_EVENT_ACTION, 
    CALL_UPDATE_EVENT, CALL_DELETE_EVENT, TAKE_CURRENT_ID, CALL_LIKE_EVENT } from './actionTypes'
// const { GET_EVENTS_CALL, EVENTS_LOADER, POST_EVENT_ACTION, DELETE_EVENT, UPDATE_EVENT, TAKE_CURRENT_ID } = obj;

export const getEvents = () => ({type: GET_EVENTS_CALL});

export const postEvent = (value) => ({type: POST_EVENT_ACTION, value});

export const deleteEvent = (id) => ({type: CALL_DELETE_EVENT, payload: id});

export const updateEvent = (updateData) => ({type: CALL_UPDATE_EVENT, payload: updateData});

export const likeEvent = (id) => ({type: CALL_LIKE_EVENT, payload: id});

export const setCurrentId = (event) => ({type: TAKE_CURRENT_ID, payload: event});