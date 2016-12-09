import {createStore, applyMiddleware} from 'redux';
import {rootReducer, rootEpic} from './rootReducer';
import {loadState} from '../middleware/persistentState/persistentState';
import createLogger from 'redux-logger';
import persistentMiddleware from '../middleware/persistentState/persistentStateMiddleware';
import {createEpicMiddleware} from 'redux-observable';

const epicMiddleware = createEpicMiddleware(rootEpic);
const logger = createLogger();
const persistent = persistentMiddleware(['form']);

const finalCreateStore = applyMiddleware(epicMiddleware, logger, persistent)(createStore);

function configureStore() {
    const persistedState = loadState();
    return finalCreateStore(rootReducer, persistedState);
}

export default configureStore;