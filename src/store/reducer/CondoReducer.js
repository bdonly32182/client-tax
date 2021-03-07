import {FETCHS_CONDO,FETCH_CONDO,DELETE_ROOM,CREATE_ROOM} from '../action/ActionType';
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