import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {combineEpics} from 'redux-observable';
import appReducer from '../components/main/appBarDucks';
import ridesReducer, {
    loadCabsEpic,
    loadCallsEpic,
    loadRidesEpic,
    loadRideEpic,
    saveRideEpic,
    deleteRideEpic
} from '../components/forms/rides/ridesDucks';

export const rootEpic = combineEpics(
    loadCabsEpic,
    loadCallsEpic,
    loadRidesEpic,
    loadRideEpic,
    saveRideEpic,
    deleteRideEpic
);

export const rootReducer = combineReducers({
    form: formReducer,
    app: appReducer,
    rides: ridesReducer
});