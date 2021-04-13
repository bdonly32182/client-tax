import {FETCH_CHECKDOCUMENT,FETCHS_CHECKDOCUMENT} from '../action/ActionType';
const checkDocsReducer = (state = [] , action) => {
    switch (action.type) {
        case FETCH_CHECKDOCUMENT:
            
            return action.payload;
        case FETCHS_CHECKDOCUMENT :
            return action.payload
        default:
            return state;
    }
}
export default checkDocsReducer;