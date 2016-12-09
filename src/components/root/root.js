import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import DevTools from '../devTools/devToolsComponent';

const production = process.env.NODE_ENV === 'production';

export default class Root extends Component {
    render() {
        const {store, routes, browserHistory} = this.props;
        return (
            <Provider store={store}>
                <div>
                    <Router history={browserHistory} routes={routes}/>
                    {production ? "" : <DevTools />}
                </div>
            </Provider>
        );
    }
}