import {createStore, applyMiddleware} from 'redux';
import {rootReducer, rootEpic} from './rootReducer';
import DevTools from '../components/devTools/devToolsComponent';
import {loadState} from '../middleware/persistentState/persistentState';
import createLogger from 'redux-logger';
import persistentMiddleware from '../middleware/persistentState/persistentStateMiddleware';
import {createEpicMiddleware} from 'redux-observable';
import {composeWithDevTools} from 'redux-devtools-extension';

const epicMiddleware = createEpicMiddleware(rootEpic);
const logger = createLogger();
const persistent = persistentMiddleware(['form']);

const finalCreateStore = composeWithDevTools(
    applyMiddleware(epicMiddleware, logger, persistent),
    DevTools.instrument()
)(createStore);

function configureStore() {
    const persistedState = loadState();
    //console.log('persisted state', persistedState);
    const store = finalCreateStore(rootReducer, persistedState);
    if (module.hot) {
        module.hot.accept('./rootReducer', () =>
            store.replaceReducer(require('./rootReducer'))
        );
    }
    return store;
}

export default configureStore;