import {FETCH_USEFUL_LAND,FETCHS_USEFUL_IN_LAND} from '../action/ActionType'
export default (state = [], action) => {
switch (action.type) {
    case FETCHS_USEFUL_IN_LAND:
        return action.payload;
    case FETCH_USEFUL_LAND:
        return action.payload
    default:
        return state;
}
}