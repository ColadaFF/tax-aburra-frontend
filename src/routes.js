import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import AppComponent from './components/main/appComponent';
import RidesForm  from './components/forms/rides/ridesFormComponent';
import RidesTable  from './components/forms/rides/RidesTable';

export default (
    <Router history={browserHistory}>
        <Route path="/" component={AppComponent}>
            <Route path="rides">
                <Route path="add" component={RidesForm}/>
                <Route path="list" component={RidesTable}/>
                <Route path="edit/:id" component={RidesForm}/>
            </Route>
        </Route>
    </Router>
);