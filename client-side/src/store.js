import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootSaga from './sagas/rootSaga'
import reducer from './reducers/rootreducer';

const sagaMiddleWare = createSagaMiddleware();

let store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleWare)))

sagaMiddleWare.run(rootSaga);

export default store;