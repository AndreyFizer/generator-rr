import {CHANGE_ME} from 'actions/types';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
    switch (action.type){
        case CHANGE_ME:
            return state;
        default:
            return state;
    }
}
