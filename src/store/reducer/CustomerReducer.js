import {FETCHS_CUSTOMER,FETCH_CUSTOMER} from '../action/ActionType';

const CustomerReducer = (state=[],action) =>{
    switch (action.type) {
        case FETCHS_CUSTOMER:
            
            return action.payload;
        case FETCH_CUSTOMER:
            return action.payload
        default:
            return state;
    }
};
export default CustomerReducer