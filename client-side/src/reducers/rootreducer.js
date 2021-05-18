import { combineReducers } from 'redux';
import events from './eventsReducer'
import user from './user'

export default combineReducers({
    events,
    user
})