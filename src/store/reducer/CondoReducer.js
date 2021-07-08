import {FETCHS_CONDO,FETCH_CONDO} from '../action/ActionType';
const condoReducer =  (state = [] , action) => {
        switch (action.type) {
            case FETCHS_CONDO:
                return action.payload;
            case FETCH_CONDO:
                return action.payload;
            default:
                return state;
        };
};
export default condoReducer;