import api from '../../../middleware/api';
import Rx, {Observable} from 'rxjs';
import Immutable from 'immutable';
import _ from 'lodash';
import {browserHistory} from 'react-router';

const SAVE_FORM = "tax/rides/SAVE_FORM";
const DELETE_RIDE = "tax/rides/DELETE_RIDE";
const DELETE_RIDE_FULFILLED = "tax/rides/DELETE_RIDE_FULFILLED";
const SAVE_FORM_FULFILLED = "tax/rides/SAVE_FORM_FULFILLED";
const LOAD_CABS = "tax/rides/LOAD_CABS";
const LOAD_CABS_FULFILLED = "tax/rides/LOAD_CABS_FULFILLED";

const LOAD_CALLS = "tax/rides/LOAD_CALLS";
const LOAD_CALLS_FULFILLED = "tax/rides/LOAD_CALLS_FULFILLED";

const LOAD_RIDES = "tax/rides/LOAD_RIDES";
const CLEAR_RIDE = "tax/rides/CLEAR_RIDE";
const LOAD_RIDES_FULFILLED = "tax/rides/LOAD_RIDES_FULFILLED";

const LOAD_RIDE = "tax/rides/LOAD_RIDE";
const LOAD_RIDE_FULFILLED = "tax/rides/LOAD_RIDE_FULFILLED";


const SAVE_RIDE = "tax/rides/SAVE_RIDE";


//Reducers
const initialState = Immutable.Map({
    cabs: [],
    calls: [],
    rides: [],
    ride: {}
});

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case LOAD_CABS_FULFILLED:
        return state.set('cabs', action.payload);
    case LOAD_CALLS_FULFILLED:
        return state.set('calls', action.payload);
    case LOAD_RIDES_FULFILLED:
        return state.set('rides', action.payload);
    case LOAD_RIDE_FULFILLED:
        return state.set('ride', action.payload);
    case CLEAR_RIDE:
        return state.set('ride', {});
    case DELETE_RIDE_FULFILLED:
        return state.set('rides', state.get('rides').filter(item => !_.isEqual(item.id, action.payload.id)));
    default:
        return state;
    }
}

export const loadCabs = () => ({type: LOAD_CABS});

export const loadRides = () => ({type: LOAD_RIDES});
export const clearRide = () => ({type: CLEAR_RIDE});
export const loadRide = (id) => ({type: LOAD_RIDE, payload: {id: id}});
export const deleteRide = (ride) => ({type: DELETE_RIDE, payload: ride});


export const saveRide = data => {
    return {
        type: SAVE_RIDE,
        payload: data
    };
};

export const loadCabsFulfilled = (data) => {
    return {
        type: LOAD_CABS_FULFILLED,
        payload: data
    }
};

export const deleteRideFulFilled = (data) => {
    return {
        type: DELETE_RIDE_FULFILLED,
        payload: data
    }
};

export const saveRideFulfilled = (data) => {
    browserHistory.push('/rides/list');
    return {
        type: SAVE_FORM_FULFILLED,
        payload: data
    }
};

export const loadRideFulfilled = (data) => {
    return {
        type: LOAD_RIDE_FULFILLED,
        payload: data
    }
};

export const loadRidesFulfilled = (data) => {
    return {
        type: LOAD_RIDES_FULFILLED,
        payload: data
    }
};

export const loadCabsEpic = action$ => action$
    .ofType(LOAD_CABS)
    .mergeMap(action => {
        const promise = api.get("/drivers");
        return Observable
            .fromPromise(promise)
            .map(response => response.data)
            .map(loadCabsFulfilled);
    });


export const loadCalls = () => ({type: LOAD_CALLS});

export const loadCallsFulfilled = (data) => {
    return {
        type: LOAD_CALLS_FULFILLED,
        payload: data
    }
};

export const loadCallsEpic = action$ => action$
    .ofType(LOAD_CALLS)
    .mergeMap(action => {
        const promise = api.get("/calls");
        return Observable
            .fromPromise(promise)
            .map(response => response.data)
            .map(loadCallsFulfilled);
    });


export const loadRidesEpic = action$ => action$
    .ofType(LOAD_RIDES)
    .mergeMap(action => {
        const promise = api.get("/rides");
        return Observable
            .fromPromise(promise)
            .map(response => response.data)
            .map(loadRidesFulfilled);
    });


export const loadRideEpic = action$ => action$
    .ofType(LOAD_RIDE)
    .mergeMap(action => {
        const promise = api.get(`/rides/${action.payload.id}`);
        return Observable
            .fromPromise(promise)
            .map(response => response.data)
            .map(loadRideFulfilled);
    });

export const saveRideEpic = action$ => action$
    .ofType(SAVE_RIDE)
    .mergeMap(action => {
        const promise = _.has(action, 'payload.id') ? api.put('rides', action.payload) : api.post('rides', action.payload);
        return Observable
            .fromPromise(promise)
            .map(response => response.data)
            .map(saveRideFulfilled);
    });

export const deleteRideEpic = action$ => action$
    .ofType(DELETE_RIDE)
    .mergeMap(action => {
        const promise = api.delete('rides', {
            data: action.payload
        });
        return Observable
            .fromPromise(promise)
            .map(response => response.data)
            .map(deleteRideFulFilled);
    });