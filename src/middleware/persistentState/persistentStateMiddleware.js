import {Subject, Subscriber} from 'rxjs';
import pick from 'lodash/pick';
import {saveState} from './persistentState';

export default (keys) => {
    var persistent$ = new Subject();

    var subscriber = Subscriber.create(
        function (state) {
            saveState(state);
            //console.log('Do Next: %s', state);
        },
        function (err) {
            //console.log('Do Error: %s', err);
        },
        function () {
            //console.log('Do Completed');
        }
    );

    persistent$
        .throttle(1000)
        .map(state => pick(state, keys))
        .subscribe(subscriber);

    return store => next => action => {
        persistent$.next(store.getState());
        return next(action);
    };
};