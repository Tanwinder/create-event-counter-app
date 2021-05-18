import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import {Api} from '../utils/api';
import {GET_EVENTS_CALL, EVENTS_LOADER, GET_EVENTS, POST_EVENT, 
    POST_EVENT_ACTION, SET_CURRENT_ID, TAKE_CURRENT_ID, 
    CALL_UPDATE_EVENT, UPDATE_EVENT, DELETE_EVENT, CALL_DELETE_EVENT,
    CALL_LIKE_EVENT} from '../actions/actionTypes'
// const {GET_EVENTS_CALL, EVENTS_LOADER, GET_EVENTS, POST_EVENT, POST_EVENT_ACTION, SET_CURRENT_ID, TAKE_CURRENT_ID} = obj;

const user = state => state?.user;

function* setCurrentId({payload}) {
    try {
        yield put({type: SET_CURRENT_ID, payload});
    } catch (error) {
        console.log(error)
    }
}

function* callEventsSaga() {

   try {
    yield put({type: EVENTS_LOADER});

    let { data } = yield call(Api, "/api/events");

    yield put({type: GET_EVENTS, payload: data});

   } catch (error) {
       console.log(error)
   }
}

function* postEventSaga({value}) {
    
    try {
        const tokenState = yield select(user);
        const token = tokenState?.userInfo?.token;
        yield put({type: EVENTS_LOADER});
        const options = {
            method: 'post',
            payload: value
        }
        const {data} = yield call(Api, '/api/events', options, token );

        yield put({type: POST_EVENT, payload: data})
    } catch(error) {
        console.log(error)
    }
}

function* updateEvent({payload}) {
    try {
        yield put({type: EVENTS_LOADER});
        const tokenState = yield select(user);
        const token = tokenState?.userInfo?.token;
        const options = {
            method: 'patch',
            payload
        }
        const { data } = yield call(Api, `/api/events/${payload._id}`, options, token);
        yield put({type: UPDATE_EVENT, payload: data});
    } catch (error) {
        console.log(error)
    }
}

function* deleteEvent({payload}) {
    try {
        yield put({type: EVENTS_LOADER});
        const options = {
            method: 'delete',
            payload
        };
        const tokenState = yield select(user);
        const token = tokenState?.userInfo?.token;
        const { data } = yield call(Api, `/api/events/${payload}`, options, token);
        yield put({type: DELETE_EVENT, payload: data});
    } catch (error) {
        console.log(error)
    }
}

function* likeEvent({payload}) {
    try {
        yield put({type: EVENTS_LOADER});
        const tokenState = yield select(user);
        const token = tokenState?.userInfo?.token;
        const options = {
            method: 'patch',
        }
        const {data} = yield call(Api, `/api/events/likeevent/${payload}`, options, token);
        yield put({type: UPDATE_EVENT, payload: data});
    } catch (error) {
        console.log(error)
    }
}

export default function* eventsSaga() {
    yield all([
        takeLatest(TAKE_CURRENT_ID, setCurrentId),
        takeLatest(GET_EVENTS_CALL, callEventsSaga),
        takeLatest(POST_EVENT_ACTION, postEventSaga),
        takeLatest(CALL_UPDATE_EVENT, updateEvent),
        takeLatest(CALL_DELETE_EVENT, deleteEvent),
        takeLatest(CALL_LIKE_EVENT, likeEvent)
    ])
}