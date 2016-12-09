import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import {browserHistory} from 'react-router';
import Root from './components/root/Root';
import Routes from './routes';

const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();
const store = configureStore();

require('./css/main.css');


ReactDOM.render(
    <Root store={store} browserHistory={browserHistory} routes={Routes}/>
    , document.querySelector('.container')
);