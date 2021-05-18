import { all, fork } from 'redux-saga/effects';
import eventsSaga from './eventSaga';
import authSaga from './authSaga'

export default function* rootSaga() {
    yield all([
        fork(eventsSaga),
        fork(authSaga)
    ])
}