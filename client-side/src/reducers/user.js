
import {AUTH, LOG_OUT_USER} from '../actions/actionTypes';
// const {AUTH, LOG_OUT_USER} = obj;
const initialState = {
    userInfo: JSON.parse(localStorage.getItem('profile')) || null
}
export default (state= initialState, action) => {
    switch(action.type) {
        case AUTH:
            return {
                userInfo: action.payload
            };
        case LOG_OUT_USER:
            localStorage.removeItem('profile');
            return {
                userInfo: null
            };  
        default:
            return state;
    }
}