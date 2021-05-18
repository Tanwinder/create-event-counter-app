import {GET_EVENTS, EVENTS_LOADER, POST_EVENT, DELETE_EVENT, UPDATE_EVENT, SET_CURRENT_ID} from '../actions/actionTypes';
// const {GET_EVENTS, EVENTS_LOADER, POST_EVENT, DELETE_EVENT, UPDATE_EVENT, SET_CURRENT_ID} = obj;

const initial_state = {
    allEvents: [],
    currentEvent: null,
    eventLoader: false
}
export default (state= initial_state, action) => {
    switch(action.type) {
        case GET_EVENTS:
            return {
                ...state,
                allEvents: action.payload,
                eventLoader: false
            };
        case EVENTS_LOADER:
            return {
                ...state,
                eventLoader: true,
            };
        case POST_EVENT:
            return {
                ...state,
                allEvents: [...state.allEvents, action.payload],
                eventLoader: false,
                currentEvent: null
            }  
        case DELETE_EVENT:
            return {
                ...state,
                allEvents: state.allEvents && state.allEvents.filter(e => {return (e._id !== action.payload._id)}),
                eventLoader: false
            } ;
        case UPDATE_EVENT:
            return {
                ...state,
                allEvents: state.allEvents && state.allEvents.map(ev => (ev._id === action.payload._id) ? action.payload : ev),
                eventLoader: false,
                currentEvent: null
            };
        case SET_CURRENT_ID:
            return {
                ...state,
                currentEvent: action.payload
            };
        default:
            return state;
    }
}