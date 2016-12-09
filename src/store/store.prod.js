import {createStore, applyMiddleware} from 'redux';
import {rootReducer, rootEpic} from './rootReducer';
import {loadState} from '../middleware/persistentState/persistentState';
import persistentMiddleware from '../middleware/persistentState/persistentStateMiddleware';
import {createEpicMiddleware} from 'redux-observable';

const epicMiddleware = createEpicMiddleware(rootEpic);
const persistent = persistentMiddleware(['form']);

const finalCreateStore = applyMiddleware(epicMiddleware, persistent)(createStore);

function configureStore() {
    const persistedState = loadState();
    return finalCreateStore(rootReducer, persistedState);
}

export default configureStore;