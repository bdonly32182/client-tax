import {FETCHS_COSTDOCUMENT, FETCH_COSTDOCUMENT} from '../action/ActionType';
const CostDocReducer = (state = [], action) => {
    switch (action.type) {
        case FETCHS_COSTDOCUMENT:
            return action.payload;
        case FETCH_COSTDOCUMENT:
            return action.payload
        default:
           return state;
    }
}
export default CostDocReducer