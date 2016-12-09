import getL from 'lodash/get';
import assign from 'lodash/assign';
import forOwn from 'lodash/forOwn';
import Immutable from 'immutable';

function toImmutableStructure(source) {
    switch (typeof source) {
    case 'array':
        return Immutable.List(source);
    case 'object':
        const root = Immutable.Map();
        forOwn(source, (value, key) => {
            root.set(key, toImmutableStructure(value));
        });
        return root;
    default:
        return source;
    }
}

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        const serializedStateObject = JSON.parse(serializedState);

        return assign({}, {
            form: getL(serializedStateObject, 'form', {})
        });
    } catch (e) {
        return undefined;
    }
};

export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        // ignore failure.
    }
};